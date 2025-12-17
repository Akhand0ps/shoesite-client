import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pollCount, setPollCount] = useState(0);
  const maxPolls = 15; // 30 seconds total (15 polls × 2 seconds)
  const pollIntervalRef = useRef(null);

  useEffect(() => {
    const orderNumber = searchParams.get('orderNumber');
    
    if (!orderNumber) {
      setError('No order number found in URL. Please check your orders page.');
      setLoading(false);
      return;
    }

    // Function to check payment status
    const checkPaymentStatus = async () => {
      try {
        // Call the specific order endpoint
        const { data } = await api.get(`/order/${orderNumber}`);
        
        if (!data.success || !data.order) {
          throw new Error('Order not found');
        }
        
        setOrder(data.order);
        setPollCount(prev => prev + 1);
        
        const paymentStatus = data.order.paymentStatus;
        
        if (paymentStatus === 'paid') {
          // Payment successful - stop polling
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
          
          // Refresh cart and clear stored data
          await refreshCart();
          localStorage.removeItem('pendingOrderId');
          localStorage.removeItem('pendingOrderNumber');
          setLoading(false);
          
        } else if (paymentStatus === 'failed') {
          // Payment failed - stop polling
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
          setError('Payment failed. Please try again or contact support.');
          setLoading(false);
          
        } else if (paymentStatus === 'pending') {
          // Still pending - continue polling (handled by interval)
          if (pollCount >= maxPolls) {
            // Timeout reached
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current);
            }
            setError('Payment verification is taking longer than expected. Please check your orders page in a few minutes.');
            setLoading(false);
          }
        }
        
      } catch (error) {
        console.error('Payment verification error:', error);
        
        // Stop polling on error
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
        
        setError(
          error.response?.data?.message || 
          error.message || 
          'Unable to verify payment status. Please check your orders page or contact support if payment was deducted.'
        );
        setLoading(false);
      }
    };

    // Start polling immediately
    checkPaymentStatus();
    
    // Set up interval to poll every 2 seconds
    pollIntervalRef.current = setInterval(() => {
      checkPaymentStatus();
    }, 2000);
    
    // Cleanup interval on unmount
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [searchParams, refreshCart, pollCount]);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold mb-2">Verifying payment...</p>
          <p className="text-gray-500 text-sm">
            Checking payment status ({pollCount}/{maxPolls})
          </p>
          <p className="text-gray-400 text-xs mt-4">
            Please don't close this page. This usually takes a few seconds.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    const isTimeout = error.includes('taking longer');
    const isPaymentFailed = error.includes('Payment failed');
    
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md px-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isTimeout ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            <svg className={`w-8 h-8 ${
              isTimeout ? 'text-yellow-600' : 'text-red-600'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isTimeout ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              )}
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isPaymentFailed ? 'Payment Failed' : isTimeout ? 'Verification Timeout' : 'Verification Issue'}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          
          {order && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg text-left">
              <p className="text-sm font-semibold text-gray-900 mb-2">Order Details:</p>
              <p className="text-sm text-gray-700">Order #: {order.orderNumber}</p>
              <p className="text-sm text-gray-700">Status: {order.paymentStatus}</p>
              <p className="text-sm text-gray-700">Amount: ₹{order.totalAmount?.toFixed(2)}</p>
            </div>
          )}
          
          <div className="flex flex-col gap-3">
            <Link
              to="/orders"
              className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-lg font-semibold transition-colors"
            >
              Check My Orders
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
            <Link
              to="/products"
              className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isPaymentCompleted = order?.paymentStatus === 'completed';

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 sm:p-8">
          {/* Success Icon */}
          <div className="text-center mb-6">
            {isPaymentCompleted ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {isPaymentCompleted ? 'Order Placed Successfully!' : 'Payment Pending'}
            </h1>
            <p className="text-gray-600">
              {isPaymentCompleted 
                ? 'Thank you for your purchase. Your order has been confirmed.' 
                : 'Your order has been created. Payment verification is in progress.'}
            </p>
          </div>

          {/* Order Details */}
          <div className="border-t border-b border-gray-200 py-6 my-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <p className="text-lg font-bold text-gray-900">{order?.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                  isPaymentCompleted 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order?.paymentStatus || 'Pending'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                  {order?.orderStatus || 'Pending'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                <p className="text-lg font-bold text-gray-900">₹{order?.totalAmount?.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {order?.items && order.items.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-16 h-16 object-cover rounded-md border border-gray-200"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900">₹{item.subtotal?.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping Address */}
          {order?.shippingAddress && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Shipping Address</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">{order.shippingAddress.fullName}</p>
                <p className="text-gray-700">{order.shippingAddress.street}</p>
                <p className="text-gray-700">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-gray-700">{order.shippingAddress.country}</p>
                <p className="text-gray-700 mt-2">Phone: {order.shippingAddress.phoneNumber}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/orders"
              className="flex-1 py-3 bg-gray-900 hover:bg-black text-white text-center rounded-lg font-semibold transition-colors"
            >
              View All Orders
            </Link>
            <Link
              to="/products"
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 text-center rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Verification Status */}
          {pollCount > 1 && isPaymentCompleted && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
              <p>✓ Payment verified after {pollCount} check(s)</p>
            </div>
          )}
          
          {/* Additional Info */}
          {isPaymentCompleted && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">What's Next?</p>
                  <p>We've sent a confirmation email to your registered email address. Your order will be processed and shipped soon.</p>
                </div>
              </div>
            </div>
          )}
          
          {!isPaymentCompleted && order && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Payment Pending</p>
                  <p>Your payment is being processed. This can take a few minutes. Check back later or visit your orders page.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
