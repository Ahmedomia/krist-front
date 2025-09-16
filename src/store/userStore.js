import { create } from "zustand";

const useUserStore = create((set) => ({
  users: JSON.parse(localStorage.getItem("users")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,

  signup: (userData) =>
    set((state) => {
      const updatedUsers = [...state.users, userData];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("user", JSON.stringify(userData));
      return { users: updatedUsers, user: userData };
    }),

  login: (email, password) =>
    set((state) => {
      const existingUser = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (existingUser) {
        localStorage.setItem("user", JSON.stringify(existingUser));
        return { user: existingUser };
      }
      return state;
    }),

  updateUser: (updatedData) =>
    set((state) => {
      if (!state.user) return state;

      const updatedUser = { ...state.user, ...updatedData };
      const updatedUsers = state.users.map((u) =>
        u.id === state.user.id ? updatedUser : u
      );

      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return { user: updatedUser, users: updatedUsers };
    }),

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useUserStore;
