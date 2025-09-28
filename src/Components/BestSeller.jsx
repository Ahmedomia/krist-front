import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHeart, FaRegEye } from "react-icons/fa";
import MyIcons from "../Components/Icons";
import useCartStore from "../store/cartStore";
import { fetchBestSellers } from "../../api";
import useWishlistStore from "../store/wishlistStore";

export default function BestSeller() {
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState([]);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const wishlist = useWishlistStore((state) => state.wishlist);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const loadWishlist = useWishlistStore((state) => state.loadWishlist);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadBestSellers = async () => {
      try {
        setLoading(true);
        const { data } = await fetchBestSellers();
        setBestSellers(data);
        loadWishlist();
      } catch (err) {
        setError("Failed to load best sellers.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBestSellers();
  }, []);

  const handleAddToCart = async (item) => {
    setNotification(`${item.name} added to cart!`);

    try {
      await addToCart(item, 1);
    } catch (err) {
      setNotification("Failed to add item to cart ❌");
      console.error(err);
    }

    setTimeout(() => setNotification(""), 2000);
  };

  const handleWishlistToggle = async (item) => {
    const exists = wishlist.some((w) => w.productId?._id === item._id);

    useWishlistStore.setState((state) => ({
      wishlist: exists
        ? state.wishlist.filter((w) => w.productId?._id !== item._id)
        : [...state.wishlist, { productId: item }],
    }));
    setNotification(
      exists
        ? `${item.name} removed from favourites ❌`
        : `${item.name} added to favourites ❤️`
    );

    try {
      if (exists) {
        await removeFromWishlist(item._id);
      } else {
        await addToWishlist(item);
      }
    } catch (err) {
      await loadWishlist();
      setNotification("Wishlist action failed ❌");
      console.error(err);
    }

    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {notification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-all">
          {notification}
        </div>
      )}

      <main className="flex-1 p-6 flex flex-col">
        {loading ? (
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col">
                <Skeleton height={300} />
                <div className="p-3 text-center">
                  <Skeleton
                    width={120}
                    height={16}
                    style={{ margin: "4px auto" }}
                  />
                  <Skeleton
                    width={80}
                    height={12}
                    style={{ margin: "4px auto" }}
                  />
                  <Skeleton
                    width={60}
                    height={16}
                    style={{ margin: "4px auto" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div className="flex justify-center items-center mb-10">
              <h2 className="text-2xl font-bold">Our Bestseller</h2>
            </div>

            <div className="grid grid-cols-4 gap-8">
              {bestSellers.map((item) => (
                <div
                  key={item._id}
                  className="group rounded transition flex flex-col"
                >
                  <div className="bg-gray-50 hover:bg-[#F3F3F3] rounded h-[300px] p-4 relative flex flex-col justify-between">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-70 w-full object-contain mb-4"
                    />
                    <div className="absolute top-4 right-1 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleWishlistToggle(item)}
                        className={`p-2 rounded-full shadow-md transition ${
                          wishlist.some((w) => w.productId?._id === item._id)
                            ? "bg-red-500 text-white"
                            : "bg-white hover:bg-black hover:text-white"
                        }`}
                      >
                        <FaHeart size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/product/${item._id}`)}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-black hover:text-white transition"
                      >
                        <FaRegEye size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="cursor-pointer w-full bg-white text-black py-2 rounded-lg hover:bg-black hover:text-white transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="p-4 text-center cursor-default">
                    <p className="text-base font-semibold">{item.name}</p>
                    <p className="text-gray-500 text-sm">{item.brand}</p>
                    <div className="flex gap-2 items-center justify-center mt-1">
                      <span className="text-lg font-bold text-black">
                        ${item.price}
                      </span>
                      {item.oldPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          ${item.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
