import axios from 'axios';

const API_URL = '/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authService = {
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
  getProfile: () => axios.get(`${API_URL}/auth/profile`, { headers: getAuthHeader() }),
  updateProfile: (data) => axios.put(`${API_URL}/auth/profile`, data, { headers: getAuthHeader() })
};

export const productService = {
  getAllProducts: (page, limit, category, search) =>
    axios.get(`${API_URL}/products`, {
      params: { page, limit, category, search }
    }),
  getProductById: (id) => axios.get(`${API_URL}/products/${id}`),
  getCategories: () => axios.get(`${API_URL}/products/categories`),
  createProduct: (data) => axios.post(`${API_URL}/products`, data, { headers: getAuthHeader() }),
  updateProduct: (id, data) => axios.put(`${API_URL}/products/${id}`, data, { headers: getAuthHeader() }),
  deleteProduct: (id) => axios.delete(`${API_URL}/products/${id}`, { headers: getAuthHeader() })
};

export const cartService = {
  getCart: () => axios.get(`${API_URL}/cart`, { headers: getAuthHeader() }),
  addToCart: (data) => axios.post(`${API_URL}/cart/add`, data, { headers: getAuthHeader() }),
  removeFromCart: (productId) => axios.delete(`${API_URL}/cart/${productId}`, { headers: getAuthHeader() }),
  updateCartItem: (productId, data) => axios.put(`${API_URL}/cart/${productId}`, data, { headers: getAuthHeader() }),
  clearCart: () => axios.delete(`${API_URL}/cart`, { headers: getAuthHeader() })
};

export const orderService = {
  createOrder: (data) => axios.post(`${API_URL}/orders`, data, { headers: getAuthHeader() }),
  getOrders: () => axios.get(`${API_URL}/orders`, { headers: getAuthHeader() }),
  getOrderById: (id) => axios.get(`${API_URL}/orders/${id}`, { headers: getAuthHeader() }),
  getAllOrders: (page, limit, status) =>
    axios.get(`${API_URL}/orders/admin/all`, {
      params: { page, limit, status },
      headers: getAuthHeader()
    }),
  updateOrderStatus: (id, data) => axios.put(`${API_URL}/orders/${id}/status`, data, { headers: getAuthHeader() }),
  cancelOrder: (id) => axios.put(`${API_URL}/orders/${id}/cancel`, {}, { headers: getAuthHeader() })
};
