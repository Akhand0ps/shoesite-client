import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-gray-900 text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Backend validates authorization via cookies (adminToken or userToken)
  // If user doesn't have correct token, backend returns 401/403
  // Axios interceptor will catch it and redirect to login

  return children;
};

export default ProtectedRoute;
