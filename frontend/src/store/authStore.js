import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,

  initAuth: () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const token = localStorage.getItem('token') || null;
    set({ user, token });
  },

  setUser: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  isAdmin: () => {
    return get().user?.role === 'admin';
  }
}));
