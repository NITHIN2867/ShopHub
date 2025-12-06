import { useEffect, useState } from 'react';
import { orderService } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingData, setShippingData] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    phoneNumber: ''
  });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { user } = useAuthStore();
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!shippingData.street || !shippingData.city || !shippingData.zipCode) {
      alert('Please fill all shipping details');
      return;
    }

    if (!cart || cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      setCheckoutLoading(true);
      
      // Prepare order items from local cart
      const orderItems = cart.map(item => ({
        productId: item._id || item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      }));

      const response = await orderService.createOrder({
        items: orderItems,
        totalAmount: totalPrice,
        shippingAddress: shippingData,
        paymentMethod: paymentMethod
      });

      alert('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order');
      console.error('Failed to place order:', error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-white p-12 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                {cart.map(item => (
                  <div
                    key={item._id || item.id}
                    className="flex gap-4 border-b pb-4 last:border-b-0 items-start"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image || 'https://via.placeholder.com/100x100'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        ₹{item.price.toLocaleString()} each
                      </p>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-32">
                        <button
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900 mb-3">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item._id || item.id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              {!showCheckout ? (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={shippingData.street}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingData.city}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={shippingData.state}
                      onChange={handleShippingChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      required
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={shippingData.country}
                      onChange={handleShippingChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={shippingData.zipCode}
                      onChange={handleShippingChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      required
                    />
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone"
                      value={shippingData.phoneNumber}
                      onChange={handleShippingChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  {/* Payment Method Selection */}
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50" 
                             onClick={() => setPaymentMethod('cod')}>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <span className="font-medium text-gray-700">Cash on Delivery (COD)</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50" 
                             onClick={() => setPaymentMethod('online')}>
                        <input
                          type="radio"
                          name="payment"
                          value="online"
                          checked={paymentMethod === 'online'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <span className="font-medium text-gray-700">💳 Pay Online (Razorpay)</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={checkoutLoading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-bold disabled:bg-gray-400"
                  >
                    {checkoutLoading ? 'Processing...' : `Proceed to ${paymentMethod === 'cod' ? 'Order' : 'Payment'}`}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
