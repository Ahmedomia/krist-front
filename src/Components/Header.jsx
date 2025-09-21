import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import api from "../../api";

export default function Header() {
  const [shopOpen, setShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);

  const subtotal = (cartItems || []).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/cart");
        setCartItems(data.cartItems || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [setCartItems]);

  const handleRemoveItem = async (id) => {
    try {
      const { data } = await api.delete(`/cart/${id}`);
      setCartItems(data.cartItems);
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
    }
  };

  return (
    <header className="w-full bg-white relative z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <img src="/assets/Group.svg" alt="Logo" className="h-8" />
          <a href="/" className="cursor-pointer font-semibold text-4xl">
            Krist
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-gray-700 relative">
          <a href="/" className="hover:text-black">
            Home
          </a>
          <div className="relative">
            <button
              onClick={() => setShopOpen((prev) => !prev)}
              className="hover:text-black flex items-center gap-1"
            >
              Shop
              <svg
                className={`w-4 h-4 transition-transform`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {shopOpen && (
              <div className="absolute left-1/2 -translate-x-1/3 mt-2 w-[1000px] bg-white rounded-lg shadow-lg grid grid-cols-4 p-6 gap-6 z-50">
                <div>
                  <h3 className="font-bold mb-2">Men</h3>
                  <a href="#" className="block py-1 hover:text-black">
                    T-Shirts
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Casual Shirts
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Formal Shirts
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Jackets
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Blazers & Coats
                  </a>
                  <h4 className="font-semibold mt-3">Indian & Festive Wear</h4>
                  <a href="#" className="block py-1 hover:text-black">
                    Kurtas & Kurta Sets
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Sherwanis
                  </a>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Women</h3>
                  <a href="#" className="block py-1 hover:text-black">
                    Kurtas & Suits
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Sarees
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Ethnic Wear
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Lehenga Cholis
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Jackets
                  </a>
                  <h4 className="font-semibold mt-3">Western Wear</h4>
                  <a href="#" className="block py-1 hover:text-black">
                    Dresses
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Jumpsuits
                  </a>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Footwear</h3>
                  <a href="#" className="block py-1 hover:text-black">
                    Flats
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Casual Shoes
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Heels
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Boots
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Sports Shoes & Floaters
                  </a>
                  <h4 className="font-semibold mt-3">Product Features</h4>
                  <a href="#" className="block py-1 hover:text-black">
                    360 Product Viewer
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Product with Video
                  </a>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Kids</h3>
                  <a href="#" className="block py-1 hover:text-black">
                    T-Shirts
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Shirts
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Jeans
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Trousers
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Party Wear
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Innerwear & Thermal
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Track Pants
                  </a>
                  <a href="#" className="block py-1 hover:text-black">
                    Value Pack
                  </a>
                </div>
              </div>
            )}
          </div>
          <a href="#" className="hover:text-black">
            Our Story
          </a>
          <a href="#" className="hover:text-black">
            Blog
          </a>
          <a href="#" className="hover:text-black">
            Contact Us
          </a>
        </nav>

        <div className="flex items-center gap-4 relative">
          <button className="text-gray-700 hover:text-black">
            <img src="/assets/search.svg" alt="search" />
          </button>
          <button className="text-gray-700 hover:text-black">
            <img src="/assets/fav.svg" alt="favourite" />
          </button>
          <button
            onClick={() => setCartOpen((prev) => !prev)}
            className="text-gray-700 hover:text-black relative"
          >
            <img src="/assets/cart.svg" alt="cart" />
            {(cartItems?.length ?? 0) > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>

          {cartOpen && (
            <div className="absolute right-20 top-12 w-96 bg-white p-6 z-50">
              {loading ? (
                <p>Loading cart...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (cartItems?.length ?? 0) === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <p className="mb-4 text-gray-700">
                    You have {cartItems?.length ?? 0} items in your cart
                  </p>

                  <div className="space-y-4 max-h-60 overflow-y-auto p-2 border-b border-gray-200">
                    {(cartItems ?? []).map((item) => (
                      <div
                        key={item._id}
                        className="grid grid-cols-4 items-center gap-2"
                      >
                        <div className="flex items-center gap-2 col-span-2">
                          <img
                            src={item.image.replace(/\/\/assets/, "/assets")}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                          <div className="flex flex-col">
                            <p className="text-sm font-medium">{item.name}</p>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span>{item.quantity}</span>
                              <span>x</span>
                              <span>
                                $
                                {(Number(item.price) * item.quantity).toFixed(
                                  2
                                )}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400">
                              Size: {item.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center border rounded w-fit col-span-1"></div>
                        <div className="flex flex-col items-end col-span-1">
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="mt-1 w-6 h-6 cursor-pointer"
                          >
                            <img
                              src="/assets/trashred-svgrepo-com.svg"
                              alt="Delete"
                              className="w-6 h-6"
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4 font-medium">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => navigate("/CheckoutPage")}
                      className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          <button
            onClick={() => navigate("/user/login")}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Login
          </button>
        </div>
      </div>

      {(shopOpen || cartOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setShopOpen(false);
            setCartOpen(false);
          }}
        />
      )}
    </header>
  );
}
