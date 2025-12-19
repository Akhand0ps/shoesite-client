import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-16 bg-white relative">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-12 sm:py-20 px-4">
        
        {/* Decorative elements */}
        <div className="absolute top-20 sm:top-32 left-4 sm:left-20 opacity-10 sm:opacity-20">
          <svg width="60" height="60" viewBox="0 0 120 120" fill="none" className="sm:w-[120px] sm:h-[120px]">
            <circle cx="10" cy="10" r="3" fill="#D1D5DB"/>
            <path d="M20 10 Q 40 30, 60 10" stroke="#D1D5DB" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        
        <div className="absolute bottom-20 sm:bottom-40 right-4 sm:right-32 opacity-10 sm:opacity-20">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="sm:w-[100px] sm:h-[100px]">
            <path d="M10 50 Q 30 20, 50 50 T 90 50" stroke="#D1D5DB" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-full">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-900 rounded-full"></div>
            <span className="text-[10px] sm:text-xs font-medium text-gray-700 uppercase tracking-wider">
              Collection 2025 is Live
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            The footwear
            <span className="block mt-1 sm:mt-2 font-serif italic font-normal text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-gray-800">
              revolution
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Analyzing trends in premium footwear design and customer preferences across the modern e-commerce ecosystem.
          </p>
          
          {/* Floating badges */}
          <div className="relative mb-8 sm:mb-16">
            {/* Left badge */}
            <div className="absolute -left-20 top-0 hidden xl:block">
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Quality</div>
                  <div className="text-sm font-semibold text-gray-900">Premium Materials</div>
                </div>
              </div>
            </div>
            
            {/* Right badge */}
            <div className="absolute -right-20 top-8 hidden xl:block">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Velocity</div>
                <div className="text-lg font-bold text-gray-900">+24% Growth</div>
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-xs text-gray-600">Trending</span>
                </div>
              </div>
            </div>
            
            {/* Bottom section */}
            <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3 sm:gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mb-2 sm:mb-3">
                    <span>Season</span>
                    <span className="hidden xs:inline">Fall/Winter 2025</span>
                    <span className="xs:hidden">FW 2025</span>
                  </div>
                  {/* Progress bar */}
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-[10px] sm:text-xs text-gray-600">Q1</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-900 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-600">Q4</span>
                  </div>
                </div>
                <Link 
                  to="/products"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 hover:bg-black rounded-lg sm:rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg group flex-shrink-0"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center justify-center">
            {/* Left line */}
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-200"></div>
            
            {/* Center ornament */}
            <div className="px-4 sm:px-8">
              <div className="relative">
                {/* Outer circle */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-gray-200 flex items-center justify-center">
                  {/* Inner circle */}
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-900 rounded-full"></div>
                  </div>
                </div>
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-l-2 border-gray-300 rounded-tl"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-r-2 border-gray-300 rounded-tr"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-l-2 border-gray-300 rounded-bl"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-r-2 border-gray-300 rounded-br"></div>
              </div>
            </div>
            
            {/* Right line */}
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-200"></div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 sm:py-12 md:py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">S</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-gray-900">SOLEVIA</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premium footwear collection for the modern lifestyle. Quality meets style.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-3 sm:mb-4">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all duration-200 flex items-center gap-1 group py-1 px-1 rounded hover:bg-gray-50">
                    Products
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all duration-200 flex items-center gap-1 group py-1 px-1 rounded hover:bg-gray-50">
                    About Us
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
                {user && !user.isAdmin && (
                  <>
                    <li>
                      <Link to="/orders" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all duration-200 flex items-center gap-1 group py-1 px-1 rounded hover:bg-gray-50">
                        My Orders
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link to="/cart" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all duration-200 flex items-center gap-1 group py-1 px-1 rounded hover:bg-gray-50">
                        Shopping Cart
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Connect */}
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-gray-900 font-semibold mb-3 sm:mb-4">Connect</h3>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <a href="https://github.com/Akhand0ps" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-gray-900 rounded-lg flex items-center justify-center transition-all group" aria-label="GitHub">
                  <svg className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/akhand-pratap-singh-286770275/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all group" aria-label="LinkedIn">
                  <svg className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">© 2025 SOLEVIA. All rights reserved</p>
            <div className="flex items-center gap-6 sm:gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
