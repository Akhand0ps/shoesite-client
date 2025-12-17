import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">SOLEVIA</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              About
            </Link>
            {user && !user.isAdmin && (
              <Link to="/orders" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Orders
              </Link>
            )}
            {user && user.isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Admin Panel
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {!user.isAdmin && (
                  <Link 
                    to="/cart" 
                    className="relative text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            {user && !user.isAdmin && (
              <Link 
                to="/cart" 
                className="relative text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/products" 
                onClick={closeMobileMenu}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Products
              </Link>
              <Link 
                to="/about" 
                onClick={closeMobileMenu}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                About
              </Link>
              {user && !user.isAdmin && (
                <Link 
                  to="/orders" 
                  onClick={closeMobileMenu}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Orders
                </Link>
              )}
              {user && user.isAdmin && (
                <Link 
                  to="/admin" 
                  onClick={closeMobileMenu}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium text-left"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
