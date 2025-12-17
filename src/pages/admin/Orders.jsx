import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetchOrders();
  }, [location.pathname]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/order/admin/orders');
      console.log('Admin Orders API Response:', data);
      
      // Backend returns 'Allorders' field
      const ordersArray = data.Allorders || [];
      setOrders(ordersArray);
    } catch (error) {
      setError('Failed to load orders');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (ordernumber, newStatus) => {
    try {
      await api.patch(`/order/admin/status/${ordernumber}`, { status: newStatus });
      setOrders(orders.map(order => 
        (order.ordernumber === ordernumber || order.orderNumber === ordernumber) 
          ? { ...order, status: newStatus } 
          : order
      ));
    } catch (error) {
      alert('Failed to update order status');
      console.error('Error:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      processing: 'bg-blue-100 text-blue-700 border-blue-200',
      shipped: 'bg-purple-100 text-purple-700 border-purple-200',
      delivered: 'bg-green-100 text-green-700 border-green-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => (order.status || 'pending') === filterStatus);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-900 text-xl">Loading orders...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">{filteredOrders.length} orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2 text-xs">
                ({status === 'all' ? orders.length : orders.filter(o => o.status === status).length})
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">Order #{order.ordernumber || order.orderNumber}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status || 'pending')}`}>
                      {(order.status || 'pending').toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Customer: {order.userId?.name || 'Unknown'} ({order.userId?.email || 'N/A'})</p>
                    <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                    <p>Payment: {order.paymentMethod} • Status: {order.paymentStatus || 'Pending'}</p>
                    <p>Items: {order.items?.length || 0} products</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">₹{order.totalAmount?.toFixed(2) || '0.00'}</p>
                  </div>

                  {/* Status Update */}
                  <select
                    value={order.status || 'pending'}
                    onChange={(e) => handleStatusUpdate(order.ordernumber || order.orderNumber, e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-semibold focus:outline-none focus:border-gray-900"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <Link
                    to={`/orders/${order.ordernumber || order.orderNumber}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-all text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Order Items:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {item.title || item.productId?.title || item.productId?.name || 'Product'}
                        </p>
                        <p className="text-xs text-gray-600">
                          Size {item.size} • Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-gray-900">₹{item.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              {(order.shippingAddress || order.address) && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Shipping Address:</h4>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress?.name && <span className="font-semibold">{order.shippingAddress.name}<br /></span>}
                    {order.shippingAddress?.line1 || order.address?.street}, {order.shippingAddress?.city || order.address?.city}, {order.shippingAddress?.state || order.address?.state} {order.shippingAddress?.zip || order.address?.zipCode}
                    {order.shippingAddress?.phone && <><br />Phone: {order.shippingAddress.phone}</>}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600">No orders found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
