import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shoesite-server.onrender.com/api/v1',
  // baseURL:'http://localhost:3000/api/v1',
  withCredentials: true, // This sends cookies automatically
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - log requests for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthorized errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const isLoginPage = window.location.pathname === '/login';
    const isRegisterPage = window.location.pathname === '/register';
    
    console.error(`❌ ${error.response?.status} ${error.config?.url}`, error.response?.data?.message || error.message);
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Only redirect if not already on login/register page
      if (!isLoginPage && !isRegisterPage) {
        console.warn("⚠️ Unauthorized access");
        
        // Check if this is an admin-only endpoint
        const url = error.config?.url || '';
        const isAdminEndpoint = url.includes('/admin/');
        
        // Only clear user and redirect for admin endpoints or if user is not in localStorage
        const hasUser = localStorage.getItem('user');
        
        if (isAdminEndpoint || !hasUser) {
          console.warn("🔴 Clearing user and redirecting to login");
          localStorage.removeItem('user');
          window.location.href = '/login';
        } else {
          console.warn("⚠️ Got 401/403 but user exists - might be admin-only endpoint");
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
