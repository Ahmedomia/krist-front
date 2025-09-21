import { FaRegStar, FaExchangeAlt, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { useState, useEffect } from "react";
import { fetchBestSellers } from "../../api";

export default function BestSeller() {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [notification, setNotification] = useState("");

  const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
      const loadBestSellers = async () => {
        try {
          const { data } = await fetchBestSellers();
          setBestSellers(data);
        } catch (err) {
          console.error("Failed to load best sellers", err);
        }
      };
      loadBestSellers();
    }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    setNotification(`${item.name} added to cart!`);
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto mt-16 pb-8">
      {notification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-all">
          {notification}
        </div>
      )}

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
                <button className="bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-black hover:text-white transition">
                  <FaRegStar size={16} />
                </button>
                <button className="bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-black hover:text-white transition">
                  <FaExchangeAlt size={16} />
                </button>
                <button
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-black hover:text-white transition"
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
    </div>
  );
}
