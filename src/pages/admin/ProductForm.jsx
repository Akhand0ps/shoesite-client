import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';

const ProductForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEdit = !!slug;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    brand: '',
    category: '',
    originalPrice: '',
    variants: [{ size: '6', stock: '', price: '' }]
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchCategories();
    if (isEdit) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [slug]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/cat/admin');
      setCategories(data.AllCats || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/product/${slug}`);
      const product = data.product;
      
      // Convert Decimal128 to number if needed
      const originalPrice = product.originalPrice ?? '';
      
      setFormData({
        title: product.title || product.name || '',
        description: product.description || '',
        brand: product.brand || '',
        category: product.category?._id || '',
        originalPrice: originalPrice,
        variants: product.variants?.map(v => ({ 
          size: v.size.toString(), 
          stock: v.stock, 
          price: v.price 
        })) || [{ size: '6', stock: '', price: '' }]
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product details: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { size: '6', stock: '', price: '' }]
    });
  };

  const removeVariant = (index) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
    console.log("images=>",images);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('originalPrice', formData.originalPrice);
      // formDataToSend.append('isPublic', true);
      formDataToSend.append('variants', JSON.stringify(formData.variants));

      console.log('FormData being sent:', {
        title: formData.title,
        brand: formData.brand,
        category: formData.category,
        originalPrice: formData.originalPrice,
        variants: formData.variants
      });

      images.forEach((image) => {
        formDataToSend.append('media', image);
      });

      if (isEdit) {
        await api.put(`/product/admin/update/${slug}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Product updated successfully');
      } else {
        await api.post('/product/admin/create', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Product created successfully');
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Submit Error:', error);
      console.error('Error Response:', error.response);
      console.error('Error Data:', error.response?.data);
      alert(error.response?.data?.message || error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Original Price (₹) *
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                required
                min="0"
                step="1"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900"
              />
              <p className="text-sm text-gray-600 mt-2">Base price before any discounts</p>
            </div>

            {/* Images */}
            {!isEdit && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Product Images *
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900"
                />
                <p className="text-sm text-gray-600 mt-2">Upload one or more product images</p>
              </div>
            )}

            {/* Variants */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold text-gray-900">
                  Size Variants *
                </label>
                <button
                  type="button"
                  onClick={addVariant}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-all text-sm"
                >
                  + Add Size
                </button>
              </div>

              <div className="space-y-3">
                {formData.variants.map((variant, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <select
                        value={variant.size}
                        onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900"
                      >
                        <option value="6">Size 6</option>
                        <option value="7">Size 7</option>
                        <option value="8">Size 8</option>
                        <option value="9">Size 9</option>
                        <option value="10">Size 10</option>
                        <option value="11">Size 11</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Stock"
                        value={variant.stock}
                        onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                        required
                        min="0"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Price (₹)"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                        required
                        min="0"
                        step="1"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    {formData.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition-all"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold transition-all disabled:opacity-50"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
