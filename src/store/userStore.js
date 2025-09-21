import { create } from "zustand";
import api from "../../api";

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("userInfo")) || null,

  setUser: (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
    set({ user: userData });
  },

  updateUser: (newData) =>
    set((state) => {
      const updatedUser = { ...state.user, ...newData };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),

  signup: async (userData) => {
    try {
      const { data } = await api.post("/users/signup", {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      set({ user: data });
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Signup failed";
    }
  },

  login: async (email, password) => {
    try {
      const { data } = await api.post("/users/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      set({ user: data });
      return data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  },

  logout: () => {
    localStorage.removeItem("userInfo");
    set({ user: null });
  },
}));

export default useUserStore;
