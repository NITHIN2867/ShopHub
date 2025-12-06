import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export function generateToken(userId, role) {
  return jwt.sign({ userId, role }, config.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
