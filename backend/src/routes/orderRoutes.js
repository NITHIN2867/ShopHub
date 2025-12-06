import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  cancelOrder
} from '../controllers/orderController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/admin/all', authenticate, authorize('admin'), getAllOrders);
router.get('/:id', authenticate, getOrderById);
router.put('/:id/status', authenticate, authorize('admin'), updateOrderStatus);
router.put('/:id/cancel', authenticate, cancelOrder);

export default router;
