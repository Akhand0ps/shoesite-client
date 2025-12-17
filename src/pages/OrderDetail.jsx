import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const OrderDetail = () => {
  const { ordernumber } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchOrder();
  }, [ordernumber]);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/order/${ordernumber}`);
      setOrder(data.order);
    } catch (error) {
      setError('Failed to load order');
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setCancelling(true);
    try {
      await api.put(`/order/cancel/${ordernumber}`);
      await fetchOrder();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-700 bg-yellow-50 border-yellow-200',
      processing: 'text-blue-700 bg-blue-50 border-blue-200',
      shipped: 'text-purple-700 bg-purple-50 border-purple-200',
      delivered: 'text-green-700 bg-green-50 border-green-200',
      cancelled: 'text-red-700 bg-red-50 border-red-200'
    };
    return colors[status] || 'text-gray-700 bg-gray-50 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-gray-900 text-xl">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-gray-900 text-xl">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/orders')}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Orders
        </button>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Order Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order #{order.orderNumber || order.ordernumber}
              </h1>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(order.status || 'pending')}`}>
                {(order.status || 'pending').toUpperCase()}
              </span>
              {(order.status === 'pending' || !order.status) && (
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Order'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <img 
                    src={item.image || item.productId?.media?.[0] || item.productId?.imageUrl?.[0]} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">No Image</div>';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title || item.productId?.name || item.productId?.title}
                  </h3>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-semibold">₹{item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
            <div className="text-gray-700 space-y-1">
              <p className="font-semibold">{order.shippingAddress?.name}</p>
              <p>{order.shippingAddress?.line1}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
              <p>PIN: {order.shippingAddress?.zip}</p>
              <p className="pt-2">Phone: {order.shippingAddress?.phone}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order.shippingCost?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({order.tax}%)</span>
                <span>₹{(((order.subtotal + order.shippingCost) * order.tax / 100) || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Payment Status</span>
                <span className="capitalize">{order.paymentStatus || 'Pending'}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between text-gray-900 text-xl font-bold">
                  <span>Total</span>
                  <span>₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
