import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import useCartStore from "../store/cartStore";
import api from "../../api";
import useWishlistStore from "../store/wishlistStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const [shopOpen, setShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const user = useUserStore((state) => state.user);
  const logoutUser = useUserStore((state) => state.logout);

  const wishlist = useWishlistStore((state) => state.wishlist);
  const loadWishlist = useWishlistStore((state) => state.loadWishlist);
  const setWishlist = useWishlistStore((state) => state.setWishlist);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const wishlistRef = useRef(null);

  const subtotal = (cartItems || []).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setError("Please login first to view your cart");
        return;
      }
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
    const previousCart = [...cartItems];
    setCartItems(cartItems.filter((item) => item._id !== id));

    try {
      const { data } = await api.delete(`/cart/${id}`);
      setCartItems(data.cartItems);
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
      setCartItems(previousCart);
    }
  };

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  const handleSearch = useCallback(
    debounce(async (q) => {
      if (!q.trim()) {
        setResults([]);
        setSearchLoading(false);
        return;
      }
      try {
        setSearchLoading(true);
        const { data } = await api.get(`/products?search=${q}`);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err.message);
      } finally {
        setSearchLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setResults([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => handleSearch.cancel();
  }, [handleSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wishlistRef.current && !wishlistRef.current.contains(e.target)) {
        setWishlistOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const handleRemoveWishlist = async (wishlistItemId) => {
    const previousWishlist = [...wishlist];
    setWishlist(wishlist.filter((item) => item._id !== wishlistItemId));

    try {
      await api.delete(`/wishlist/${wishlistItemId}`);
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      setWishlist(previousWishlist);
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
              className="hover:text-black flex items-center gap-1 cursor-pointer"
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
                  <button
                    onClick={() =>
                      navigate("/ShopPage?category=Men&subcategory=T-Shirts")
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    T-Shirts
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        "/ShopPage?category=Men&subcategory=Casual Shirts"
                      )
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Casual Shirts
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        "/ShopPage?category=Men&subcategory=Formal Shirts"
                      )
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Formal Shirts
                  </button>
                  <button
                    onClick={() =>
                      navigate("/ShopPage?category=Men&subcategory=Jackets")
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Jackets
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        "/ShopPage?category=Men&subcategory=Blazers & Coats"
                      )
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Blazers & Coats
                  </button>
                  <h4 className="font-semibold mt-3">Indian & Festive Wear</h4>
                  <button
                    onClick={() =>
                      navigate(
                        "/ShopPage?category=Men&subcategory=Kurtas & Kurta Sets"
                      )
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Kurtas & Kurta Sets
                  </button>
                  <button
                    onClick={() =>
                      navigate("/ShopPage?category=Men&subcategory=Sherwanis")
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Sherwanis
                  </button>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Women</h3>
                  <button
                    onClick={() =>
                      navigate(
                        "/ShopPage?category=Women&subcategory=Kurtas & Suits"
                      )
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Kurtas & Suits
                  </button>
                  <button
                    onClick={() =>
                      navigate("/ShopPage?category=Women&subcategory=Sarees")
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Sarees
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        "/ShopPage?category=Women&subcategory=Ethnic Wear"
                      )
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Ethnic Wear
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        "/ShopPage?category=Women&subcategory=Lehenga Cholis"
                      )
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Lehenga Cholis
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        "/ShopPage?category=Winter Wear&subcategory=Jackets"
                      )
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Jackets
                  </button>
                  <h4 className="font-semibold mt-3">Western Wear</h4>
                  <button
                    onClick={() =>
                      navigate("/ShopPage?category=Men&subcategory=Dresses")
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Dresses
                  </button>
                  <a href="#" className="block py-1 hover:text-black">
                    Jumpsuits
                  </a>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Footwear</h3>
                  <button
                    onClick={() => navigate("/ShopPage?subcategory=Sneakers")}
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Flats
                  </button>
                  <button
                    onClick={() => navigate("/ShopPage?subcategory=Shoes")}
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Casual Shoes
                  </button>
                  <button
                    onClick={() => navigate("/ShopPage?subcategory=Heels")}
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Heels
                  </button>
                  <button
                    onClick={() => navigate("/ShopPage?subcategory=Boots")}
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Boots
                  </button>
                  <button
                    onClick={() =>
                      navigate("/ShopPage?subcategory=Sports Shoes & Floaters")
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Sports Shoes & Floaters
                  </button>
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
                  <button
                    onClick={() => navigate("/ShopPage?subcategory=T-Shirts")}
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    T-Shirts
                  </button>
                  <button
                    onClick={() => navigate("/ShopPage?subcategory=T-Shirts")}
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Shirts
                  </button>
                  <button
                    onClick={() => navigate("/ShopPage?subcategory=Jeans")}
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Jeans
                  </button>
                  <button
                    onClick={() => navigate("/ShopPage?subcategory=Trousers")}
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Trousers
                  </button>
                  <button
                    onClick={() => navigate("/ShopPage?subcategory=Party Wear")}
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Party Wear
                  </button>
                  <button
                    onClick={() =>
                      navigate("/ShopPage?subcategory=Innerwear & Thermal")
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Innerwear & Thermal
                  </button>
                  <button
                    onClick={() =>
                      navigate("/ShopPage?subcategory=Track Pants")
                    }
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Track Pants
                  </button>
                  <button
                    onClick={() => navigate("/ShopPage?subcategory=Value Pack")}
                    className="block py-1 hover:text-black cursor-pointer"
                  >
                    Value Pack
                  </button>
                </div>
              </div>
            )}
          </div>
          <a href="/OurStory" className="hover:text-black">
            Our Story
          </a>
          <a href="/ContactUs" className="hover:text-black">
            Contact Us
          </a>
          {user?.isAdmin && (
            <a href="/admin" className="hover:text-black">
              Admin
            </a>
          )}
        </nav>

        <div className="flex items-center gap-4 relative">
          <div className="relative search-container">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              placeholder="Search products..."
              className="border rounded px-3 py-2"
            />

            {(searchLoading || results.length > 0) && (
              <div className="absolute top-full mt-1 w-64 bg-white shadow rounded">
                {searchLoading && (
                  <div className="p-2 text-gray-400 italic">
                    Searching for “{query}”...
                  </div>
                )}

                {!searchLoading &&
                  results.map((r) => (
                    <div
                      key={r._id}
                      onClick={() => navigate(`/product/${r._id}`)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {r.name}
                    </div>
                  ))}
              </div>
            )}

            {results.length > 0 && (
              <div className="absolute top-full mt-1 w-64 bg-white shadow rounded">
                {results.map((r) => (
                  <div
                    key={r._id}
                    onClick={() => navigate(`/product/${r._id}`)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {r.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="text-gray-700 hover:text-black">
            <img
              src="/assets/search.svg"
              alt="search"
              className="cursor-pointer"
            />
          </button>
          <button
            onClick={() => setWishlistOpen((prev) => !prev)}
            className="text-gray-700 hover:text-black relative cursor-pointer"
          >
            <img
              src="/assets/fav.svg"
              alt="favourite"
              className="cursor-pointer"
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          {wishlistOpen && (
            <div
              ref={wishlistRef}
              className="absolute right-30 top-12 w-96 bg-white p-6 z-50 shadow-lg rounded"
            >
              {wishlist.length === 0 ? (
                <p>No favourites yet.</p>
              ) : (
                <>
                  <p className="mb-4 text-gray-700">
                    You have {wishlist.length} favourite items ❤️
                  </p>
                  <div className="space-y-4 max-h-60 overflow-y-auto p-2 border-b border-gray-200">
                    {wishlist.map((item) => {
                      if (!item?.productId) {
                        return (
                          <div
                            key={item._id}
                            className="grid grid-cols-4 items-center gap-2 p-2 rounded bg-gray-50"
                          >
                            <div className="flex items-center gap-2 col-span-3">
                              <img
                                src="/assets/placeholder.png"
                                alt="Unknown product"
                                className="w-14 h-14 object-cover rounded"
                              />
                              <div className="flex flex-col">
                                <p className="text-sm font-medium text-gray-500">
                                  Product unavailable
                                </p>
                                <span className="text-gray-400">N/A</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveWishlist(item._id)}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <img
                                src="/assets/trashred-svgrepo-com.svg"
                                alt="Delete"
                                className="w-6 h-6"
                              />
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={item._id}
                          className="grid grid-cols-4 items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        >
                          <div
                            onClick={() =>
                              navigate(`/product/${item.productId._id}`)
                            }
                            className="flex items-center gap-2 col-span-3"
                          >
                            <img
                              src={
                                item.productId.image ||
                                "/assets/placeholder.png"
                              }
                              alt={item.productId.name || "Unnamed product"}
                              className="w-14 h-14 object-cover rounded"
                            />
                            <div className="flex flex-col">
                              <p className="text-sm font-medium">
                                {item.productId.name || "Unnamed product"}
                              </p>
                              <span className="text-gray-700">
                                ${item.productId.price ?? "N/A"}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveWishlist(item._id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <img
                              src="/assets/trashred-svgrepo-com.svg"
                              alt="Delete"
                              className="w-6 h-6"
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
          <button
            onClick={() => setCartOpen((prev) => !prev)}
            className="text-gray-700 hover:text-black relative cursor-pointer"
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
                <div className="space-y-4 max-h-60 overflow-y-auto p-2 border-b border-gray-200">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-4 items-center gap-2"
                    >
                      <div className="flex items-center gap-2 col-span-2">
                        <Skeleton width={56} height={56} borderRadius={8} />
                        <div className="flex flex-col gap-1">
                          <Skeleton width={100} height={14} />
                          <Skeleton width={80} height={12} />
                          <Skeleton width={60} height={10} />
                        </div>
                      </div>
                      <Skeleton width={20} height={20} />
                      <Skeleton circle width={24} height={24} />
                    </div>
                  ))}
                </div>
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
          {user ? (
            <button onClick={logout}>
              <FiLogOut
                size={24}
                className="hover:text-red-500 cursor-pointer"
              />
            </button>
          ) : (
            <button
              onClick={() => navigate("/user/login")}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {(shopOpen || cartOpen || wishlistOpen) && (
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
