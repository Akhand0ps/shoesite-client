import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetchDashboardData();
  }, [location.pathname]);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, categoriesRes] = await Promise.allSettled([
        api.get('/product/products'),
        api.get('/order/admin/orders'),
        api.get('/cat/')
      ]);

      console.log('Products Response:', productsRes);
      console.log('Orders Response:', ordersRes);
      console.log('Categories Response:', categoriesRes);

      const products = productsRes.status === 'fulfilled' 
        ? (productsRes.value.data.Products || productsRes.value.data.products || [])
        : [];
      
      const orders = ordersRes.status === 'fulfilled'
        ? (ordersRes.value.data.Allorders || ordersRes.value.data.orders || [])
        : [];
      
      const categories = categoriesRes.status === 'fulfilled'
        ? (categoriesRes.value.data.AllCats || [])
        : [];

      if (productsRes.status === 'rejected') console.error('Products fetch failed:', productsRes.reason);
      if (ordersRes.status === 'rejected') console.error('Orders fetch failed:', ordersRes.reason);
      if (categoriesRes.status === 'rejected') console.error('Categories fetch failed:', categoriesRes.reason);

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalCategories: categories.length,
        recentOrders: orders.slice(0, 5)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-900 text-xl">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your e-commerce platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalProducts}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Products</p>
            <Link to="/admin/products" className="text-sm text-gray-900 hover:underline mt-2 inline-block">
              Manage products →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalOrders}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Orders</p>
            <Link to="/admin/orders" className="text-sm text-gray-900 hover:underline mt-2 inline-block">
              View orders →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalCategories}</h3>
            <p className="text-gray-600 text-sm mt-1">Categories</p>
            <Link to="/admin/categories" className="text-sm text-gray-900 hover:underline mt-2 inline-block">
              Manage categories →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/admin/products/new"
              className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-gray-900 transition-all"
            >
              <svg className="w-8 h-8 text-gray-900 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-semibold text-gray-900">Add Product</span>
            </Link>

            <Link
              to="/admin/categories/new"
              className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-gray-900 transition-all"
            >
              <svg className="w-8 h-8 text-gray-900 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-sm font-semibold text-gray-900">Add Category</span>
            </Link>

            <Link
              to="/admin/orders"
              className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-gray-900 transition-all"
            >
              <svg className="w-8 h-8 text-gray-900 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm font-semibold text-gray-900">View Orders</span>
            </Link>

            <Link
              to="/admin/products"
              className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-gray-900 transition-all"
            >
              <svg className="w-8 h-8 text-gray-900 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="text-sm font-semibold text-gray-900">All Products</span>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
          {stats.recentOrders.length === 0 ? (
            <p className="text-gray-600">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Order #{order.ordernumber}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{order.totalAmount?.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
