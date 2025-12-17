import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      // Check localStorage for user data
      const storedUser = localStorage.getItem('user');
      const loginTime = localStorage.getItem('loginTime');
      
      if (storedUser && loginTime) {
        const elapsed = Date.now() - parseInt(loginTime);
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        if (elapsed < oneHour) {
          setUser(JSON.parse(storedUser));
          
          // Set up automatic logout after remaining time
          const remainingTime = oneHour - elapsed;
          const logoutTimer = setTimeout(() => {
            logout();
            window.location.href = '/login';
          }, remainingTime);
          
          // Cleanup timer on unmount
          return () => clearTimeout(logoutTimer);
        } else {
          // Token expired, clear data
          localStorage.removeItem('user');
          localStorage.removeItem('loginTime');
        }
      }
      setLoading(false);
    };
    
    const cleanup = initAuth();
    return cleanup;
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      // Store login time for token expiration tracking
      const loginTime = Date.now();
      localStorage.setItem('loginTime', loginTime.toString());
      
      // Backend returns success but no user data
      // We need to determine if user is admin or regular user
      // The backend sets userToken or adminToken cookie based on role
      // We'll make a test request to see which role we have
      
      let userData;
      try {
        // Try admin endpoint - if it works, user is admin
        await api.get('/order/admin/orders', { params: { limit: 1 } });
        userData = { email, isAdmin: true, name: email.split('@')[0] };
      } catch {
        // Admin endpoint failed, user is regular user
        userData = { email, isAdmin: false, name: email.split('@')[0] };
      }
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      return { success: true, message: 'Registration successful. Please login.' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('loginTime');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
