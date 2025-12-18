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
      // The cookie is httpOnly and automatically sent with requests via axios withCredentials
      // Wait for cookie to be set by browser
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Determine role by testing admin-specific endpoint
      // Backend middleware checks adminToken for /admin routes
      let isAdmin = false;
      try {
        // Test admin endpoint - will use adminToken cookie if available
        await api.get('/order/admin/orders');
        isAdmin = true;
      } catch (error) {
        // If no adminToken cookie or authorization fails, user is not admin
        isAdmin = false;
      }
      
      const userData = { email, isAdmin, name: email.split('@')[0] };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, isAdmin };
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