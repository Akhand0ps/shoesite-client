import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shoesite-server.onrender.com/api/v1',
  withCredentials: true, // This sends cookies automatically
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isLoginPage = window.location.pathname === '/login';
    const isRegisterPage = window.location.pathname === '/register';
    
    // Don't redirect if already on login/register page (user is trying to login)
    if ((error.response?.status === 401 || error.response?.status === 403) && !isLoginPage && !isRegisterPage) {
      // Token expired or unauthorized
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
