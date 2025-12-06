import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export async function getCart(req, res) {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');

    res.json(cart || { userId: req.user.userId, items: [], totalPrice: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
  }
}

export async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price
      });
    }

    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();

    res.json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to cart', error: error.message });
  }
}

export async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();

    res.json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove from cart', error: error.message });
  }
}

export async function updateCartItem(req, res) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();

    res.json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart', error: error.message });
  }
}

export async function clearCart(req, res) {
  try {
    await Cart.findOneAndUpdate({ userId: req.user.userId }, { items: [], totalPrice: 0 });

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
}
