import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/Breadcrumb';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { success, error: showError } = useToast();
  
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError('');
    setProduct(null);
    setSelectedImage(0);
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/product/${slug}`);
      setProduct(data.product);
      if (data.product.variants && data.product.variants.length > 0) {
        setSelectedVariant(data.product.variants[0]);
        setQuantity(1); // Reset quantity when product loads
      }
    } catch (error) {
      setError('Failed to load product');
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      showError('Please login to add items to cart');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }

    if (!selectedVariant) {
      showError('Please select a size');
      return;
    }

    if (quantity > selectedVariant.stock) {
      showError(`Only ${selectedVariant.stock} items available in stock`);
      return;
    }

    const result = await addToCart(selectedVariant.sku, quantity);
    
    if (result.success) {
      success('Added to cart successfully!');
    } else {
      showError(result.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-gray-900 text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-gray-900 text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Breadcrumb 
          items={[
            { label: 'Products', link: '/products' },
            { label: product?.title || product?.name || 'Product' }
          ]} 
        />

        <button
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <img 
                src={(product.imageUrl || product.media)?.[selectedImage] || '/placeholder-shoe.jpg'} 
                alt={product.title || product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {((product.imageUrl && product.imageUrl.length > 1) || (product.media && product.media.length > 1)) && (
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {(product.imageUrl || product.media)?.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-md sm:rounded-lg overflow-hidden bg-gray-100 border-2 transition-all ${
                      selectedImage === idx 
                        ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={`${product.title || product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.brand && (
              <p className="text-gray-900 font-semibold mb-1 sm:mb-2 uppercase text-xs sm:text-sm tracking-wide">{product.brand}</p>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{product.title || product.name}</h1>
            
            {selectedVariant && (
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                ₹{selectedVariant.price.toFixed(2)}
              </p>
            )}

            {product.description && (
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">{product.description}</p>
            )}

            {/* Size Selection */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                Select Size
              </label>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {product.variants?.map((variant) => (
                  <button
                    key={variant.sku}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setQuantity(1); // Reset quantity when size changes
                    }}
                    disabled={variant.stock === 0}
                    className={`p-2 sm:p-3 rounded-lg border-2 transition-all font-semibold text-sm sm:text-base ${
                      selectedVariant?.sku === variant.sku
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : variant.stock === 0
                        ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 bg-white text-gray-900 hover:border-gray-900'
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-900 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-gray-900 text-base sm:text-lg font-semibold w-10 sm:w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(selectedVariant?.stock || 1, quantity + 1))}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-900 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  disabled={!selectedVariant || quantity >= selectedVariant.stock}
                >
                  +
                </button>
              </div>
              {selectedVariant && (
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  {selectedVariant.stock} in stock
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            {!user ? (
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 sm:py-4 bg-gray-900 hover:bg-black text-white rounded-lg font-semibold text-base sm:text-lg transition-colors"
              >
                Login to Add to Cart
              </button>
            ) : user.isAdmin ? (
              <div className="w-full py-3 sm:py-4 bg-gray-100 border-2 border-gray-300 text-gray-600 rounded-lg font-semibold text-base sm:text-lg text-center">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Admin View Only - Manage via Admin Panel
                </div>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className="w-full py-3 sm:py-4 bg-gray-900 hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-base sm:text-lg transition-colors"
              >
                {selectedVariant?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
