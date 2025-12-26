import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [location.pathname]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      console.log("📦 Fetching products from /product/products");
      const response = await api.get('/product/products');
      console.log("✅ Products fetched:", response.data);
      
      // API returns "Products" (capital P), "products", or "product"
      const productsArray = Array.isArray(response.data.Products) 
        ? response.data.Products 
        : Array.isArray(response.data.products) 
        ? response.data.products 
        : Array.isArray(response.data.product) 
        ? response.data.product 
        : [];
      
      setProducts(productsArray);
    } catch (error) {
      console.error('❌ Error fetching products:', error.response?.status, error.message);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/product/searchBar?q=${searchQuery}`);
      
      // Extract products array - API returns it as "product" field
      const productsArray = Array.isArray(response.data.product) 
        ? response.data.product 
        : Array.isArray(response.data.products) 
        ? response.data.products 
        : [];
      
      if (productsArray.length === 0) {
        setError('No products found for your search');
      }
      
      setProducts(productsArray);
    } catch (error) {
      setError('Search failed. Please try again.');
      console.error('Error searching:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-gray-900 text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Search Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: 'Products' }]} />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Discover Footwear</h1>
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-600">
                  {products.length} item{products.length !== 1 ? 's' : ''} available
                </p>
                {!searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    New
                  </span>
                )}
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="flex-1 md:max-w-xl">
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, brand, or category..."
                  className="w-full pl-12 pr-28 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 focus:bg-white focus:shadow-lg transition-all"
                />
                <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        fetchProducts();
                      }}
                      className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                      title="Clear search"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-sm rounded-lg font-medium transition-all hover:shadow-lg"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {searchQuery && (
          <div className="mb-6 flex items-center gap-2 text-sm">
            <span className="text-gray-600">Showing results for</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-900 text-white font-semibold rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {searchQuery}
            </span>
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 shadow-inner">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
            {searchQuery ? (
              <div className="max-w-md mx-auto">
                <p className="text-gray-600 mb-6">
                  We couldn't find any matches for <span className="font-semibold text-gray-900">"{searchQuery}"</span>. Try adjusting your search.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    fetchProducts();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold transition-all hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  View all products
                </button>
              </div>
            ) : (
              <p className="text-gray-600 max-w-md mx-auto">Check back soon for new arrivals and exciting products</p>
            )}
          </div>
        ) : (
          <>
            {/* Products Count Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300 w-8"></div>
                <span className="text-sm font-medium text-gray-900 bg-gray-100 px-4 py-2 rounded-full">
                  {products.length} Product{products.length !== 1 ? 's' : ''}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300 w-8"></div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
