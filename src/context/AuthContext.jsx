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
    // Simply restore user from localStorage on mount
    // Let the axios interceptor handle token expiration
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      // Backend sets userToken or adminToken cookie based on role
      // Wait for cookie to be set by browser
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Determine role by testing admin endpoint
      // If 200/404 = admin, if 403 = user, if 401 = no valid token (shouldn't happen)
      let isAdmin = false;
      try {
        await api.get('/order/admin/orders');
        // Success or 404 means user has admin token
        isAdmin = true;
      } catch (error) {
        if (error.response?.status === 403) {
          // Forbidden = user has userToken but not admin
          isAdmin = false;
        } else if (error.response?.status === 401 || error.response?.status === 400) {
          // Unauthorized = no valid token
          return { success: false, message: 'Authentication failed - please try again' };
        } else {
          // Network error or other - assume success, let backend handle it
          isAdmin = false;
        }
      }
      
      const userData = { email, isAdmin, name: email.split('@')[0] };
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
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};