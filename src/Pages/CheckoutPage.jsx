import { useEffect } from "react";
import useCartStore from "../store/cartStore";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import OrderSummary from "../Components/OrderSummary";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);


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

          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-4 items-center py-4">
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
              <p className="text-gray-700">${item.price.toFixed(2)}</p>
              <div className="flex items-center border rounded w-fit">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-3 py-1 text-lg"
                >
                  −
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-1 text-lg"
                >
                  +
                </button>
              </div>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </section>
        <OrderSummary showCheckoutButton={true} showPlaceOrderButton={false} />
      </main>

      <Footer />
    </div>
  );
}
