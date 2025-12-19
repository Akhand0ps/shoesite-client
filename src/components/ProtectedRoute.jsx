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

  // Admin-only routes
  if (requireAdmin && !user.isAdmin) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <a href="/" className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all">
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  // User-only routes (admins cannot access)
  if (requireUser && user.isAdmin) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Admin accounts cannot access user features. Please use a regular user account.</p>
          <a href="/admin" className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all">
            Go to Admin Panel
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;