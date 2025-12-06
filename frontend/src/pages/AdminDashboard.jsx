import { useEffect, useState } from 'react';
import { productService, orderService } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    images: [{ url: '', alt: '' }],
    tags: []
  });

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/login');
      return;
    }

    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchOrders();
    }
  }, [user, activeTab, navigate, isAdmin]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts(1, 100);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders(1, 50);
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, field, value) => {
    const newImages = [...formData.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, formData);
      } else {
        await productService.createProduct(formData);
      }

      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        stock: '',
        images: [{ url: '', alt: '' }],
        tags: []
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      alert('Failed to save product');
      console.error('Failed to save product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      stock: product.stock,
      images: product.images || [{ url: '', alt: '' }],
      tags: product.tags || []
    });
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      await productService.deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await orderService.updateOrderStatus(orderId, { orderStatus: status });
      fetchOrders();
    } catch (error) {
      alert('Failed to update order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome, {user?.name}</p>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 bg-white rounded-lg shadow-md p-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Orders
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Products</h2>
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingProduct(null);
                  setFormData({
                    name: '',
                    description: '',
                    price: '',
                    originalPrice: '',
                    category: '',
                    stock: '',
                    images: [{ url: '', alt: '' }],
                    tags: []
                  });
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                <FiPlus className="text-xl" />
                Add Product
              </button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                <div className="bg-white rounded-lg max-w-2xl w-full my-8">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-6">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>

                    <form onSubmit={handleAddProduct} className="space-y-4 max-h-96 overflow-y-auto pr-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />

                      <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20"
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          name="price"
                          placeholder="Price"
                          value={formData.price}
                          onChange={handleFormChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        <input
                          type="number"
                          name="originalPrice"
                          placeholder="Original Price"
                          value={formData.originalPrice}
                          onChange={handleFormChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="category"
                          placeholder="Category"
                          value={formData.category}
                          onChange={handleFormChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                        <input
                          type="number"
                          name="stock"
                          placeholder="Stock"
                          value={formData.stock}
                          onChange={handleFormChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Images</label>
                        {formData.images.map((image, index) => (
                          <div key={index} className="space-y-2 mb-4 pb-4 border-b">
                            <input
                              type="url"
                              placeholder="Image URL"
                              value={image.url}
                              onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Image Alt Text"
                              value={image.alt}
                              onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-4 mt-6">
                        <button
                          type="submit"
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                          {editingProduct ? 'Update' : 'Create'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Products Table */}
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Name</th>
                      <th className="px-6 py-3 text-left font-semibold">Category</th>
                      <th className="px-6 py-3 text-left font-semibold">Price</th>
                      <th className="px-6 py-3 text-left font-semibold">Stock</th>
                      <th className="px-6 py-3 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3 font-semibold">{product.name}</td>
                        <td className="px-6 py-3">{product.category}</td>
                        <td className="px-6 py-3">₹{product.price}</td>
                        <td className="px-6 py-3">{product.stock}</td>
                        <td className="px-6 py-3 space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <FiEdit2 className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>

            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Order #</p>
                        <p className="font-bold">{order.orderNumber}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="font-bold">₹{order.totalAmount}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Current Status</p>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg font-semibold capitalize"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Payment</p>
                        <p className="font-bold capitalize">{order.paymentStatus}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
