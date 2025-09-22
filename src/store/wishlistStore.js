import { create } from "zustand";
import useUserStore from "./userStore";
import api from "../../api";

const useWishlistStore = create((set) => ({
  wishlist: [],

  setWishlist: (items) => set({ wishlist: items }),

  loadWishlist: async () => {
    const user = useUserStore.getState().user;
    if (!user) return;

    try {
      const { data } = await api.get("/wishlist");
      set({ wishlist: data });
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to load wishlist:", err.message);
      const saved = localStorage.getItem(`wishlist_${user.id}`);
      set({ wishlist: saved ? JSON.parse(saved) : [] });
    }
  },

  addToWishlist: async (product) => {
    const user = useUserStore.getState().user;
    if (!user) {
      window.location.href = "/user/login";
      return;
    }

    try {
      await api.post(`/wishlist/${product._id}`);
      const { data } = await api.get("/wishlist");
      set({ wishlist: data });
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to add to wishlist:", err.message);
    }
  },

  removeFromWishlist: async (productId) => {
    const user = useUserStore.getState().user;
    if (!user) return;

    try {
      await api.delete(`/wishlist/${productId}`);
      const { data } = await api.get("/wishlist");
      set({ wishlist: data });
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err.message);
    }
  },

  clearWishlist: async () => {
    const user = useUserStore.getState().user;
    if (!user) return;

    try {
      await api.delete("/wishlist");
      set({ wishlist: [] });
      localStorage.removeItem(`wishlist_${user.id}`);
    } catch (err) {
      console.error("Failed to clear wishlist:", err.message);
    }
  },
}));

export default useWishlistStore;
