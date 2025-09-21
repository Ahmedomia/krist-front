import { useEffect, useState } from "react";
import useCartStore from "../store/cartStore";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import OrderSummary from "../Components/OrderSummary";
import api from "../../api";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/cart");
        
        setCartItems(data.cartItems || []);
      } catch (err) {
        setError("Failed to load cart");
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [setCartItems]);

  const handleUpdateQuantity = async (id, delta) => {
    try {
      const item = cartItems.find((i) => i._id === id);
      if (!item) return;

      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        const { data } = await api.delete(`/cart/${id}`);
        setCartItems(data.cartItems);
      } else {
        const { data } = await api.post("/cart", {
          product: item.product._id,
          name: item.name,
          price: Number(item.price),
          image: item.image,
          quantity: delta,
          size: item.size,
        });
        setCartItems(data.cartItems);
      }
    } catch (err) {
      console.error(
        "Error updating quantity:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

          <div className="grid grid-cols-4 font-semibold text-gray-600 pb-2 mb-4">
            <span>Products</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          {loading ? (
            <p>Loading cart...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-4 items-center py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  ${Number(item.price).toFixed(2)}
                </p>
                <div className="flex items-center border rounded w-fit">
                  <button
                    onClick={() => handleUpdateQuantity(item._id, -1)}
                    className="px-3 py-1 text-lg"
                  >
                    −
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item._id, 1)}
                    className="px-3 py-1 text-lg"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </section>
        <OrderSummary showCheckoutButton={true} showPlaceOrderButton={false} />
      </main>

      <Footer />
    </div>
  );
}
