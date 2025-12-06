import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { generateOrderNumber } from '../utils/helpers.js';

export async function createOrder(req, res) {
  try {
    const { shippingAddress, paymentMethod = 'cod', notes, items, totalAmount } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    // If items are provided directly from frontend cart
    if (items && items.length > 0) {
      const order = new Order({
        userId: req.user.userId,
        orderNumber: generateOrderNumber(),
        items,
        totalAmount: totalAmount || items.reduce((sum, item) => sum + item.total, 0),
        shippingAddress,
        paymentMethod,
        notes
      });

      await order.save();

      return res.status(201).json({ message: 'Order created successfully', order });
    }

    // Fallback to Cart collection if items not provided
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      productName: item.productId.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    }));

    const order = new Order({
      userId: req.user.userId,
      orderNumber: generateOrderNumber(),
      items: orderItems,
      totalAmount: cart.totalPrice,
      shippingAddress,
      paymentMethod,
      notes
    });

    await order.save();
    await Cart.findOneAndUpdate({ userId: req.user.userId }, { items: [], totalPrice: 0 });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort('-createdAt');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, paymentStatus, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
}

export async function getAllOrders(req, res) {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter = {};

    if (status) filter.orderStatus = status;

    const skip = (page - 1) * limit;
    const orders = await Order.find(filter)
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
}

export async function cancelOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (['shipped', 'delivered', 'cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({ message: 'Cannot cancel this order' });
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel order', error: error.message });
  }
}
