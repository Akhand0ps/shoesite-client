import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shoesite-server.onrender.com/api/v1',
  // baseURL:'http://localhost:3000/api/v1',
  withCredentials: true, // This sends cookies automatically
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const isLoginPage = window.location.pathname === '/login';
      const isRegisterPage = window.location.pathname === '/register';
      
      // Only redirect if not already on login/register page
      if (!isLoginPage && !isRegisterPage) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
