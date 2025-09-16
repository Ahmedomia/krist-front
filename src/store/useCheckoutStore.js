import { create } from "zustand";
import useUserStore from "./userStore";
import useCartStore from "./cartStore";

const useCheckoutStore = create((set) => ({
  addresses: [],
  selectedAddressId: null,
  discountCode: "",
  discountAmount: 0,
  deliveryCharge: 5,
  loadAddresses: () => {
    const user = useUserStore.getState().user;
    if (!user) return;

    const saved = localStorage.getItem(`addresses_${user.id}`);
    set({ addresses: saved ? JSON.parse(saved) : [] });
  },
  selectAddress: (id) => set({ selectedAddressId: id }),
  addAddress: (newAddress) => {
    const user = useUserStore.getState().user;
    if (!user) return alert("Please login first!");

    set((state) => {
      const updated = [...state.addresses, { id: Date.now(), ...newAddress }];
      localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updated));
      return { addresses: updated };
    });
  },
  editAddress: (id, updatedData) => {
    const user = useUserStore.getState().user;
    if (!user) return;

    set((state) => {
      const updated = state.addresses.map((a) =>
        a.id === id ? { ...a, ...updatedData } : a
      );
      localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updated));
      return { addresses: updated };
    });
  },
  deleteAddress: (id) => {
    const user = useUserStore.getState().user;
    if (!user) return;

    set((state) => {
      const updated = state.addresses.filter((a) => a.id !== id);
      localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updated));
      return {
        addresses: updated,
        selectedAddressId:
          state.selectedAddressId === id ? null : state.selectedAddressId,
      };
    });
  },
  applyDiscount: (code) =>
    set(() => {
      let discount = 0;
      if (code === "FLAT50") discount = 50;
      return { discountCode: code, discountAmount: discount };
    }),
  getTotals: () => {
    const { cartItems } = useCartStore.getState();
    const { discountAmount, deliveryCharge } = useCheckoutStore.getState();

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const grandTotal = subtotal + deliveryCharge - discountAmount;
    return { subtotal, deliveryCharge, discountAmount, grandTotal };
  },
}));

export default useCheckoutStore;
