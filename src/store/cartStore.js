import { create } from "zustand";
import useUserStore from "./userStore";
import api, { addToCartApi } from "../../api";

const useCartStore = create((set, get) => ({
  cartItems: [],

  setCartItems: (items) => set({ cartItems: items }),

  loadCart: async () => {
    const user = useUserStore.getState().user;
    if (!user) return;

    try {
      const { data } = await api.get("/cart");
      const cart = data.cartItems ?? [];
      set({ cartItems: cart });
      localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(cart));
    } catch (err) {
      console.log(err);
      const saved = localStorage.getItem(`cartItems_${user.id}`);
      set({ cartItems: saved ? JSON.parse(saved) : [] });
    }
  },

  addToCart: async (product, quantity = 1) => {
    const user = useUserStore.getState().user;
    if (!user) {
      window.location.href = "/user/login";
      return;
    }

    try {
      const { data } = await addToCartApi(product._id ?? product.id, quantity);
      const cart = data.cartItems ?? [];
      set({ cartItems: cart });
      localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(cart));
      return cart;
    } catch (err) {
      console.error(
        "Failed to add to cart:",
        err.response?.data || err.message
      );
      throw err;
    }
  },

  updateQuantity: async (id, amount) => {
    const user = useUserStore.getState().user;
    if (!user) return;

    try {
      await api.put(`/cart/${id}`, { amount });
      await get().loadCart();
    } catch (err) {
      console.error(
        "Failed to update quantity:",
        err.response?.data || err.message
      );
    }
  },

  removeFromCart: async (id) => {
    const user = useUserStore.getState().user;
    if (!user) return;

    try {
      await api.delete(`/cart/${id}`);
      await get().loadCart();
    } catch (err) {
      console.error(
        "Failed to remove item:",
        err.response?.data || err.message
      );
    }
  },

  resetCart: () => {
    const user = useUserStore.getState().user;
    if (user) {
      localStorage.removeItem(`cartItems_${user.id}`);
    }
    set({ cartItems: [] });
  },
}));

export default useCartStore;
