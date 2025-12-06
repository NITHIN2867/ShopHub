import { create } from 'zustand';

export const useCartStore = create((set, get) => {
  // Load cart from localStorage on initialization
  const savedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  return {
    cart: savedCart,
    totalPrice: savedCart.reduce((sum, item) => sum + item.price * item.quantity, 0),

    addToCart: (product) => {
      const { cart } = get();
      const existingItem = cart.find(item => item._id === product._id || item.id === product.id);

      let updatedCart;
      if (existingItem) {
        updatedCart = cart.map(item =>
          (item._id === product._id || item.id === product.id)
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        updatedCart = [...cart, { ...product, quantity: product.quantity || 1 }];
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      set({ cart: updatedCart });
      get().calculateTotal();
    },

    removeFromCart: (productId) => {
      const updatedCart = get().cart.filter(item => item._id !== productId && item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      set({ cart: updatedCart });
      get().calculateTotal();
    },

    updateQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        get().removeFromCart(productId);
      } else {
        const updatedCart = get().cart.map(item =>
          (item._id === productId || item.id === productId) ? { ...item, quantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        set({ cart: updatedCart });
        get().calculateTotal();
      }
    },

    clearCart: () => {
      localStorage.removeItem('cart');
      set({ cart: [], totalPrice: 0 });
    },

    calculateTotal: () => {
      const total = get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      set({ totalPrice: total });
    },

    getCartCount: () => {
      return get().cart.reduce((count, item) => count + item.quantity, 0);
    }
  };
});
