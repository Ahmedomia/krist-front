import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export const fetchProducts = () => api.get("/products");
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const fetchRelatedProducts = (id) => api.get(`/products/${id}/related`);
export const fetchBestSellers = () => api.get("/products/bestsellers");

export const addToCartApi = (productId, quantity, size = "M") =>
  api.post("/cart", { product: productId, quantity, size });

export const updateUserProfile = (profileData) =>
  api.put("/users/profile", profileData);
export const getUserProfileApi = () => api.get("/users/profile");

export const fetchWishlist = () => api.get("/wishlist");
export const addToWishlist = (productId) => api.post(`/wishlist/${productId}`);
export const removeFromWishlist = (productId) =>
  api.delete(`/wishlist/${productId}`);

export default api;
