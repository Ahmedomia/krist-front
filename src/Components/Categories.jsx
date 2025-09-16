import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const categories = [
  { name: "Women", image: "/assets/Picture11-removebg-preview.png" },
  { name: "Men", image: "/assets/product-18.png" },
  { name: "Kids", image: "/assets/Kids-3-removebg-preview.png" },
  { name: "Shoes", image: "/assets/download__1_-removebg-preview.png" },
  {
    name: "Accessories",
    image: "/assets/example-of-fashion-accessories-removebg-preview.png",
  },
  { name: "Bags", image: "/assets/images__3_-removebg-preview.png" },
  {
    name: "Beauty",
    image: "/assets/21ni-pxtfwL._UF894_1000_QL80_-removebg-preview.png",
  },
  { name: "Sports", image: "/assets/iadsd_512-removebg-preview.png" },
];

export default function Categories() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 4;

  const next = () => {
    setStartIndex((prev) =>
      prev + visibleCards < categories.length ? prev + visibleCards : 0
    );
  };

  const prev = () => {
    setStartIndex((prev) =>
      prev - visibleCards >= 0
        ? prev - visibleCards
        : categories.length - visibleCards
    );
  };

  const visibleCategories = categories.slice(
    startIndex,
    startIndex + visibleCards
  );

  return (
    <div className="w-full max-w-[1100px] mx-auto mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Shop by Categories</h2>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="p-3 rounded bg-gray-200 hover:bg-black hover:text-white transition"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={next}
            className="p-3 rounded bg-gray-200 hover:bg-black hover:text-white transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 pb-8">
        {visibleCategories.map((cat, index) => (
          <div
            key={index}
            className="relative bg-[#F3F3F3] rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex justify-center items-center"
          >
            <span className="absolute top-3 left-3 text-6xl font-bold text-gray-200 select-none">
              {cat.name}
            </span>
            <img
              src={cat.image}
              alt={cat.name}
              className="h-56 w-full object-contain relative z-10"
            />
            <button className="absolute bottom-3 bg-white text-black w-[220px] h-[40px] rounded-md font-medium shadow hover:bg-gray-100 transition z-20">
              {cat.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
