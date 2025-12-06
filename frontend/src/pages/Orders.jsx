import { useEffect, useState } from 'react';
import { orderService } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { FiBox, FiTruck, FiCheckCircle, FiX } from 'react-icons/fi';
import { getProductImage } from '../utils/imageMap';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusIcons = {
  pending: <FiBox className="text-2xl" />,
  processing: <FiBox className="text-2xl" />,
  shipped: <FiTruck className="text-2xl" />,
  delivered: <FiCheckCircle className="text-2xl" />,
  cancelled: <FiX className="text-2xl" />
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    try {
      await orderService.cancelOrder(orderId);
      fetchOrders();
    } catch (error) {
      alert('Failed to cancel order');
      console.error('Failed to cancel order:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-white p-12 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Orders Yet</h1>
            <p className="text-gray-600 mb-6">Start shopping to place your first order</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
              {/* Order Header - Compact */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Order #</p>
                    <p className="font-bold text-sm">{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Date</p>
                    <p className="font-semibold text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Total</p>
                    <p className="font-bold text-lg text-blue-600">
                      ₹{order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusColors[order.orderStatus]}`}>
                      {statusIcons[order.orderStatus]}
                      <span className="capitalize hidden sm:inline">{order.orderStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items - With Images */}
              <div className="p-4 border-b">
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start pb-2 last:pb-0 border-b last:border-b-0">
                      {/* Product Image */}
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={getProductImage(item.productName)}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.productName}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-xs text-gray-600">₹{item.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Payment - Compact */}
              <div className="p-4 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Shipping</p>
                    <p className="font-semibold text-sm">{order.shippingAddress.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Payment</p>
                    <p className="font-semibold text-sm capitalize">{order.paymentMethod.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Status</p>
                    <p className={`font-semibold text-sm ${
                      order.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>

                {['pending', 'processing'].includes(order.orderStatus) && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition font-semibold whitespace-nowrap"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
