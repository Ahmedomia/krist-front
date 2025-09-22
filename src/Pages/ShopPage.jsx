import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaRegStar,
  FaExchangeAlt,
  FaRegEye,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import MyIcons from "../Components/Icons";
import useCartStore from "../store/cartStore";
import { fetchProducts } from "../../api";

export default function ShopPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const productsPerPage = 15;
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleAddToCart = async (item) => {
    try {
      await addToCart(item, 1);
      setNotification(`${item.name} added to cart!`);
      setTimeout(() => setNotification(""), 2000);
    } catch (err) {
      setNotification("Failed to add item to cart");
      console.error(err);
      setTimeout(() => setNotification(""), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      {notification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-all">
          {notification}
        </div>
      )}

      <div className="flex flex-1">
        <Sidebar
          products={products}
          setFilteredProducts={setFilteredProducts}
        />

        <main className="flex-1 p-6 flex flex-col">
          {loading ? (
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: productsPerPage }).map((_, index) => (
                <div key={index} className="flex flex-col">
                  <Skeleton height={330} />
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
              <div className="grid grid-cols-3 gap-4">
                {currentProducts.map((item) => (
                  <div
                    key={item._id}
                    className="group rounded transition flex flex-col"
                  >
                    <div className="bg-gray-50 hover:bg-[#F3F3F3] rounded h-[330px] p-3 relative flex flex-col justify-between">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-80 w-full object-contain mb-3"
                      />
                      <div className="absolute top-3 right-1 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-black hover:text-white transition">
                          <FaRegStar size={16} />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-black hover:text-white transition">
                          <FaExchangeAlt size={16} />
                        </button>
                        <button
                          onClick={() => navigate(`/product/${item._id}`)}
                          className="bg-white p-2 rounded-full shadow-md hover:bg-black hover:text-white transition"
                        >
                          <FaRegEye size={16} />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[80%] opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="cursor-pointer w-full bg-white text-black py-1.5 rounded-lg hover:bg-black hover:text-white transition text-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="p-3 text-center cursor-default">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-gray-500 text-xs">{item.brand}</p>
                      <div className="flex gap-1 items-center justify-center mt-1">
                        <span className="text-base font-bold text-black">
                          ${item.price}
                        </span>
                        {item.oldPrice && (
                          <span className="text-gray-400 line-through text-xs">
                            ${item.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 disabled:opacity-50 text-gray-300 hover:text-black transition"
                >
                  <FaArrowLeft />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 border rounded transition ${
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 disabled:opacity-50 text-gray-300 hover:text-black transition"
                >
                  <FaArrowRight />
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      <MyIcons />
      <Footer />
    </div>
  );
}
