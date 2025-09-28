import { create } from "zustand";
import useUserStore from "./userStore";
import api, { addToCartApi } from "../../api";

const useCartStore = create((set) => ({
  cartItems: [],

  setCartItems: (items) => set({ cartItems: items }),

  loadCart: async () => {
    const user = useUserStore.getState().user;
    if (!user) return;

    try {
      const { data } = await api.get("/cart");
      set({ cartItems: data.cart });
      localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(data.cart));
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

    set((state) => {
      const existing = state.cartItems.find((i) => i._id === product._id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i._id === product._id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, { ...product, quantity }] };
      }
    });

    try {
      const { data } = await addToCartApi(product._id ?? product.id, quantity);
      set({ cartItems: data.cart });
      localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(data.cart));
      return data;
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
      const { data } = await api.put(`/cart/${id}`, { amount });
      set({ cartItems: data.cart });
      localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(data.cart));
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
      const { data } = await api.delete(`/cart/${id}`);
      set({ cartItems: data.cart });
      localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(data.cart));
    } catch (err) {
      console.error(
        "Failed to remove item:",
        err.response?.data || err.message
      );
    }
  },

  clearCart: async () => {
    const user = useUserStore.getState().user;
    if (!user) return;

    try {
      await api.delete("/cart");
      set({ cartItems: [] });
      localStorage.removeItem(`cartItems_${user.id}`);
    } catch (err) {
      console.error("Failed to clear cart:", err.response?.data || err.message);
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
