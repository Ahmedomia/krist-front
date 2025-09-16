import { create } from "zustand";
import useUserStore from "./userStore";

const useCartStore = create((set) => ({
  cartItems: [],
  loadCart: () => {
    const user = useUserStore.getState().user;
    if (!user) return;

    const saved = localStorage.getItem(`cartItems_${user.id}`);
    set({ cartItems: saved ? JSON.parse(saved) : [] });
  },

  addToCart: (product, quantity = 1) => {
    const user = useUserStore.getState().user;
    if (!user) return alert("Please login first!");

    set((state) => {
      const existing = state.cartItems.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        updated = state.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...state.cartItems, { ...product, quantity }];
      }

      localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(updated));
      return { cartItems: updated };
    });
  },

  updateQuantity: (id, amount) => {
    const user = useUserStore.getState().user;
    if (!user) return;

    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      );

      localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(updated));
      return { cartItems: updated };
    });
  },

  removeFromCart: (id) => {
    const user = useUserStore.getState().user;
    if (!user) return;

    set((state) => {
      const updated = state.cartItems.filter((item) => item.id !== id);
      localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(updated));
      return { cartItems: updated };
    });
  },

  clearCart: () => {
    const user = useUserStore.getState().user;
    if (!user) return;

    localStorage.removeItem(`cartItems_${user.id}`);
    set({ cartItems: [] });
  },
}));

export default useCartStore;
