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
    // Check localStorage for user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      // Backend returns success but no user data
      // We need to determine if user is admin or regular user
      // The backend sets userToken or adminToken cookie based on role
      
      // Wait a moment for cookie to be set properly
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Try to verify which role by checking endpoints
      let isAdmin = false;
      
      try {
        // Try admin-only endpoint to check if user is admin
        await api.get('/cat/', { timeout: 3000 }); // Categories endpoint requires auth
        
        // If that works, try admin-specific endpoint
        try {
          await api.get('/product/admin/products/test/stock', { timeout: 3000 });
          isAdmin = true; // Only admin can access this
        } catch (adminError) {
          // Not admin or endpoint doesn't exist - check by other means
          isAdmin = false;
        }
      } catch (error) {
        // Auth failed completely
        console.error('Auth verification error:', error);
      }
      
      const userData = { 
        email, 
        isAdmin, 
        name: email.split('@')[0] 
      };
      
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
