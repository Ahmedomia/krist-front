import { create } from "zustand";
import useUserStore from "./userStore";
import useCartStore from "./cartStore";
import api from "../../api";

const useCheckoutStore = create((set) => ({
  addresses: [],
  selectedAddressId: null,
  discountCode: "",
  discountAmount: 0,
  deliveryCharge: 5,

  loadAddresses: async () => {
    const user = useUserStore.getState().user;
    if (!user) return;

    try {
      const { data } = await api.get("/addresses");
      set({ addresses: data });
    } catch (err) {
      console.error("Failed to load addresses:", err);
    }
  },

  selectAddress: (id) => set({ selectedAddressId: id }),

  addAddress: async (newAddress) => {
    const user = useUserStore.getState().user;
    if (!user) {
      window.location.href = "/login";
      return;
    }
    try {
      const payload = {
        street: newAddress.address,
        city: newAddress.city,
        state: newAddress.state,
        zip: newAddress.pin,
        country: newAddress.country || "Egypt",
      };

      const { data } = await api.post("/addresses", payload);
      set((state) => ({ addresses: [...state.addresses, data] }));
    } catch (err) {
      console.error("Failed to add address:", err);
    }
  },

  editAddress: async (id, updatedData) => {
    try {
      const { data } = await api.put(`/addresses/${id}`, updatedData);
      set((state) => ({
        addresses: state.addresses.map((a) => (a._id === id ? data : a)),
      }));
    } catch (err) {
      console.error("Failed to edit address:", err);
    }
  },

  deleteAddress: async (id) => {
    try {
      await api.delete(`/addresses/${id}`);
      set((state) => ({
        addresses: state.addresses.filter((a) => a._id !== id),
        selectedAddressId:
          state.selectedAddressId === id ? null : state.selectedAddressId,
      }));
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
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
