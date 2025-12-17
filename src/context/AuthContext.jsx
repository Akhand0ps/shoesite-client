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
    const verifyAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          // Try to verify token with a simple authenticated endpoint
          await api.get('/cat/');
          setUser(userData);
        } catch (error) {
          // Only logout if it's a 401 (Unauthorized) or 403 (Forbidden)
          if (error.response?.status === 401 || error.response?.status === 403) {
            console.log('Token invalid or expired, clearing session');
            localStorage.removeItem('user');
            setUser(null);
          } else {
            // Network error or other issue - keep user logged in
            console.log('Token verification failed but keeping session:', error.message);
            setUser(userData);
          }
        }
      }
      setLoading(false);
    };
    
    verifyAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      // Backend returns success but no user data
      // We need to determine if user is admin or regular user
      // The backend sets userToken or adminToken cookie based on role
      // We'll make a test request to see which role we have
      
      try {
        // Try admin endpoint - if it works, user is admin
        await api.get('/order/admin/orders', { params: { limit: 1 } });
        const userData = { email, isAdmin: true, name: email.split('@')[0] };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } catch {
        // Admin endpoint failed, user is regular user
        const userData = { email, isAdmin: false, name: email.split('@')[0] };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      }
      
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
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};