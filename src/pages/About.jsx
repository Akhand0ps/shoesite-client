const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">About Shoesite</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Curating the best footwear from the digital world. Crafted with precision for the modern lifestyle.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Section */}
      <div className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">The Platform</h2>
              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
                <p className="leading-relaxed">
                  Shoesite is a modern e-commerce platform designed to revolutionize the online footwear shopping experience. 
                  Built with cutting-edge technology, we bring together style, comfort, and convenience in one seamless platform.
                </p>
                <p className="leading-relaxed">
                  Our platform features a comprehensive product catalog, intelligent search and filtering, secure authentication, 
                  and a streamlined checkout process. Whether you're looking for casual sneakers, formal shoes, or athletic footwear, 
                  we've got you covered.
                </p>
                <div className="pt-2 sm:pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Key Features:</h3>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Advanced product search and filtering</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Secure user authentication and role-based access</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Shopping cart and order management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Comprehensive admin dashboard for inventory management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Responsive design optimized for all devices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">Tech Stack</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Built with modern technologies</p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="border-l-4 border-white pl-3 sm:pl-4">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Frontend</h4>
                    <p className="text-xs sm:text-sm text-gray-300">React 19, Tailwind CSS, Vite</p>
                  </div>
                  <div className="border-l-4 border-white pl-3 sm:pl-4">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Backend</h4>
                    <p className="text-xs sm:text-sm text-gray-300">Node.js, Express, MongoDB</p>
                  </div>
                  <div className="border-l-4 border-white pl-3 sm:pl-4">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Authentication</h4>
                    <p className="text-xs sm:text-sm text-gray-300">JWT with httpOnly cookies</p>
                  </div>
                  <div className="border-l-4 border-white pl-3 sm:pl-4">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Architecture</h4>
                    <p className="text-xs sm:text-sm text-gray-300">RESTful API, Role-based access control</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Meet the Developer</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Passionate about building scalable web applications and creating seamless user experiences
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <img 
                    src="https://github.com/Akhand0ps.png" 
                    alt="Akhand Pratap Singh"
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-900 shadow-lg object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160"%3E%3Crect width="160" height="160" fill="%231f2937"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48" fill="%23fff" font-weight="bold"%3EAP%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Akhand Pratap Singh</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Full Stack Developer</p>
                  
                  <div className="prose prose-gray max-w-none mb-4 sm:mb-6">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      A passionate full-stack developer with expertise in building modern web applications using the MERN stack. 
                      I specialize in creating scalable, user-friendly e-commerce platforms and enterprise applications. 
                      With a strong foundation in both frontend and backend development, I focus on delivering clean code, 
                      intuitive user interfaces, and robust system architectures.
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-2 sm:mt-3">
                      When I'm not coding, I'm exploring new technologies, contributing to open-source projects, 
                      and constantly learning to stay at the forefront of web development trends.
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Core Skills:</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start">
                      {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git'].map((skill) => (
                        <span key={skill} className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-900 rounded-full text-xs sm:text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                    <a 
                      href="https://github.com/Akhand0ps" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/akhand-pratap-singh-286770275/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to explore?</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Browse our collection of premium footwear and find your perfect pair today
          </p>
          <a 
            href="/products" 
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm sm:text-base"
          >
            View Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
