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
    // Check if this request should skip auth redirect (e.g., during login role detection)
    const skipAuthRedirect = error.config?.skipAuthRedirect;
    
    if ((error.response?.status === 401 || error.response?.status === 403) && !skipAuthRedirect) {
      // Token expired or unauthorized
      const isLoginPage = window.location.pathname === '/login';
      const isRegisterPage = window.location.pathname === '/register';
      
      if (!isLoginPage && !isRegisterPage) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
