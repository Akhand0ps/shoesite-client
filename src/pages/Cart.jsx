import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity, clearCart, refreshCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { success } = useToast();

  useEffect(() => {
    refreshCart();
  }, [location.pathname]);

  // Debug: Log cart data to see structure
  useEffect(() => {
    if (cart?.items?.length > 0) {
      console.log('Cart items full structure:', JSON.stringify(cart.items, null, 2));
      console.log('First item keys:', Object.keys(cart.items[0]));
    }
  }, [cart]);

  const handleRemove = async (sku) => {
    const result = await removeFromCart(sku);
    if (result.success) {
      success('Item removed from cart');
    }
  };

  const handleIncrease = async (sku) => {
    await addToCart(sku, 1);
  };

  const handleDecrease = async (sku) => {
    await decreaseQuantity(sku);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      const result = await clearCart();
      if (result.success) {
        success('Cart cleared');
      }
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-center">
          <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg font-semibold transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="px-2.5 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full">
              {cart.items.length}
            </span>
          </div>
          {cart.items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-xs sm:text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => {
              // Handle different image URL formats
              const getImageUrl = () => {
                // Direct fields on item
                if (item.imageUrl && Array.isArray(item.imageUrl) && item.imageUrl.length > 0) {
                  return item.imageUrl[0];
                }
                if (item.media && Array.isArray(item.media) && item.media.length > 0) {
                  return item.media[0];
                }
                if (item.image) {
                  return item.image;
                }
                
                // Nested in productId or product
                const product = item.productId || item.product;
                if (!product) return null;
                
                if (product.media && Array.isArray(product.media) && product.media.length > 0) {
                  return product.media[0];
                }
                if (product.imageUrl && Array.isArray(product.imageUrl) && product.imageUrl.length > 0) {
                  return product.imageUrl[0];
                }
                if (product.image) {
                  return product.image;
                }
                
                return null;
              };

              const imageUrl = getImageUrl();
              
              // Get product name - check multiple possible locations
              const productName = item.name || item.title || 
                                 item.productId?.name || item.productId?.title || 
                                 item.product?.name || item.product?.title || 
                                 'Product';

              const brand = item.brand || item.productId?.brand || item.product?.brand;
              const itemTotal = item.price * item.quantity;

              return (
              <div 
                key={item.sku}
                className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all"
              >
                <div className="flex gap-3 sm:gap-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 border border-gray-200">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={productName}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200"><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {brand && (
                      <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">
                        {brand}
                      </p>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {productName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Size: {item.size}
                      </span>
                      <span className="text-xs text-gray-500">SKU: {item.sku}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-lg sm:text-xl font-bold text-gray-900">₹{item.price.toFixed(2)}</p>
                      <span className="text-xs text-gray-500">each</span>
                    </div>
                    {item.quantity > 1 && (
                      <p className="text-sm text-gray-600 mt-1">
                        Total: <span className="font-semibold text-gray-900">₹{itemTotal.toFixed(2)}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.sku)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                      aria-label="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => handleDecrease(item.sku)}
                        className="w-8 h-8 sm:w-9 sm:h-9 bg-white hover:bg-gray-900 hover:text-white border border-gray-300 rounded-md text-gray-900 font-bold transition-all shadow-sm active:scale-95"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-gray-900 font-bold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.sku)}
                        className="w-8 h-8 sm:w-9 sm:h-9 bg-white hover:bg-gray-900 hover:text-white border border-gray-300 rounded-md text-gray-900 font-bold transition-all shadow-sm active:scale-95"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg lg:sticky lg:top-24">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Subtotal ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold text-gray-900">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Shipping</span>
                  <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">At checkout</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 text-lg sm:text-xl font-bold">Total</span>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-black hover:bg-gray-900 text-white rounded-xl font-bold text-base sm:text-lg transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => navigate('/products')}
                className="w-full mt-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold transition-all border-2 border-gray-200 hover:border-gray-300"
              >
                Continue Shopping
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
