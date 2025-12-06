import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getCart);
router.post('/add', authenticate, addToCart);
router.delete('/:productId', authenticate, removeFromCart);
router.put('/:productId', authenticate, updateCartItem);
router.delete('/', authenticate, clearCart);

export default router;
