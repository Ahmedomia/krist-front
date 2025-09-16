import { create } from "zustand";

const usePaymentStore = create((set) => ({
  cardDetails: null,
  setCardDetails: (details) => set({ cardDetails: details }),
}));

export default usePaymentStore;
