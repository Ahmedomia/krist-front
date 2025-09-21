import { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Women's Collection",
    subtitle: "Classic Exclusive",
    offer: "UPTO 40% OFF.",
    image: "/assets/Picture11-removebg-preview.png",
  },
  {
    title: "Men's Collection",
    subtitle: "New Arrivals",
    offer: "UPTO 30% OFF.",
    image: "/assets/product-18.png",
  },
  {
    title: "Kids Collection",
    subtitle: "Trending Now",
    offer: "UPTO TO 50%.",
    image: "/assets/Kids-3-removebg-preview.png",
  },
];

export default function Carousel() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const { title, subtitle, offer, image } = slides[current];

  return (
    <div className="flex justify-center items-center bg-white">
      <div className="relative bg-[#F3F3F3] w-[1300px] h-[520px] flex justify-between items-center px-20 overflow-hidden transition-all duration-700">
        <div className="max-w-md z-10 mb-12">
          <p className="text-lg text-black cursor-default">{subtitle}</p>
          <h2 className="text-4xl font-bold mb-4 cursor-default">{title}</h2>
          <p className="text-lg text-black cursor-default">{offer}</p>

          <button
            onClick={() => navigate("/ShopPage")}
            className="mt-6 bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
          >
            Shop Now <FaAngleRight size={12} className="translate-y-[2px]" />
          </button>
        </div>
        <span className="absolute bottom-4 text-[150px] font-extrabold text-white select-none z-0 pointer-events-none">
          BEST SELLER
        </span>
        <img
          src={image}
          alt={title}
          className="h-full object-contain transition-all duration-700 z-20"
        />
        <div className="absolute top-12 left-[800px] w-[340px] h-4 bg-white z-0"></div>
        <div className="absolute left-[800px] w-4 h-[400px] bg-white z-20"></div>
        <div className="absolute right-[160px] w-4 h-[400px] bg-white z-20"></div>
        <div className="absolute bottom-12 left-[800px] w-[340px] h-4 bg-white z-20"></div>
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-black hover:text-white transition z-30"
        >
          <FaArrowLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-black hover:text-white transition z-30"
        >
          <FaArrowRight size={18} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
