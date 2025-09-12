import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState } from "react";
import {
  FaRegStar,
  FaExchangeAlt,
  FaRegEye,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import MyIcons from "../Components/Icons";

const allProducts = [
  {
    id: 1,
    name: "Men T-shirt",
    brand: "Casual Cotton Wear",
    category: "Men",
    price: 50,
    oldPrice: 65,
    color: "red",
    size: "M",
    image: "/assets/product-18.png",
  },
  {
    id: 2,
    name: "Women Dress",
    brand: "Elegant Long Dress",
    category: "Women",
    price: 120,
    oldPrice: 150,
    color: "blue",
    size: "L",
    image: "/assets/Picture11-removebg-preview.png",
  },
  {
    id: 3,
    name: "Kids Shoes",
    brand: "Sporty Sneakers",
    category: "Kids",
    price: 80,
    oldPrice: 100,
    color: "black",
    size: "S",
    image: "/assets/Kids-3-removebg-preview.png",
  },
  {
    id: 4,
    name: "Roadstar",
    brand: "Printed Cotton T-Shirt",
    price: 38,
    oldPrice: 40,
    color: "black",
    size: "L",
    category: "Men",
    image: "/assets/bobby-lee-t-shirts-removebg-preview.png",
  },
  {
    id: 5,
    name: "Allen Solly",
    brand: "Women Textured Handheld Bag",
    price: 80,
    oldPrice: 100,
    category: "Bags",
    color: "Brown",
    size: "XL",
    image: "/assets/images__3_-removebg-preview.png",
  },
  {
    id: 6,
    name: "Louis Philippe Sport",
    brand: "Polo Collar T-Shirt",
    price: 50,
    oldPrice: 55,
    category: "Men",
    color: "gray",
    size: "M",
    image: "/assets/images__4_-removebg-preview.png",
  },
  {
    id: 7,
    name: "Adidas",
    brand: "Men adi-dash Running Shoes",
    price: 60,
    oldPrice: 75,
    category: "Men",
    color: "gray",
    size: "L",
    image: "/assets/download__1_-removebg-preview.png",
  },
  {
    id: 8,
    name: "Trendyol",
    brand: "Floral Embroidered Maxi Dress",
    price: 35,
    oldPrice: 45,
    category: "Women",
    color: "blue",
    size: "S",
    image: "/assets/images__5_-removebg-preview.png",
  },
  {
    id: 9,
    name: "YK Disney",
    brand: "Girls Pink Moana Printed Dress",
    price: 80,
    oldPrice: 100,
    category: "Kids",
    color: "black",
    size: "S",
    image: "/assets/dress-removebg-preview.png",
  },
  {
    id: 10,
    name: "US Polo",
    brand: "Tailored Cotton Casual Shirt",
    price: 40,
    oldPrice: 50,
    category: "Men",
    color: "Red",
    size: "XXL",
    image: "/assets/T-shirt-removebg-preview.png",
  },
  {
    id: 11,
    name: "Zyla",
    brand: "Women Sandals",
    price: 35,
    oldPrice: 50,
    category: "Women",
    color: "Black",
    size: "L",
    image: "/assets/sandal-removebg-preview.png",
  },
  {
    id: 12,
    name: "Allen Solly",
    brand: "Brown Leather Jacket",
    price: 60,
    oldPrice: 70,
    category: "Winter Wear",
    color: "Brown",
    size: "XXXL",
    image: "/assets/leather-jacket-removebg-preview.png",
  },
  {
    id: 13,
    name: "US Polo",
    brand: "Cauual Show for Men",
    price: 40,
    oldPrice: 50,
    category: "Men",
    color: "Brown",
    size: "M",
    image: "/assets/brownsho-removebg-preview.png",
  },
  {
    id: 14,
    name: "Gucci",
    brand: "Brown Leather Jacket",
    price: 40,
    oldPrice: 60,
    category: "Leather Hand Purse",
    color: "Red",
    size: "S",
    image: "/assets/Bag-removebg-preview.png",
  },
  {
    id: 15,
    name: "Road Star",
    brand: "Printed Blazer",
    price: 60,
    oldPrice: 70,
    category: "Women",
    color: "Black",
    size: "XXL",
    image: "/assets/images__6_-removebg-preview.png",
  },
  {
    id: 16,
    name: "YK Diseny",
    brand: "Red Printed T-Shirt",
    price: 30,
    oldPrice: 35,
    category: "Men",
    color: "red",
    size: "XL",
    image: "/assets/beer-removebg-preview.png",
  },
  {
    id: 17,
    name: "Flora",
    brand: "Leather Hand Purse",
    price: 30,
    oldPrice: 35,
    category: "Women",
    color: "Brown",
    size: "S",
    image: "/assets/images__7_-removebg-preview.png",
  },
  {
    id: 18,
    name: "Men T-shirt",
    brand: "Casual Cotton Wear",
    category: "Men",
    price: 50,
    oldPrice: 65,
    color: "red",
    size: "M",
    image: "/assets/product-18.png",
  },
  {
    id: 19,
    name: "Women Dress",
    brand: "Elegant Long Dress",
    category: "Women",
    price: 120,
    oldPrice: 150,
    color: "blue",
    size: "L",
    image: "/assets/Picture11-removebg-preview.png",
  },
  {
    id: 20,
    name: "Kids Shoes",
    brand: "Sporty Sneakers",
    category: "Kids",
    price: 80,
    oldPrice: 100,
    color: "black",
    size: "S",
    image: "/assets/Kids-3-removebg-preview.png",
  },
  {
    id: 21,
    name: "Roadstar",
    brand: "Printed Cotton T-Shirt",
    price: 38,
    oldPrice: 40,
    color: "black",
    size: "L",
    category: "Men",
    image: "/assets/bobby-lee-t-shirts-removebg-preview.png",
  },
  {
    id: 22,
    name: "Allen Solly",
    brand: "Women Textured Handheld Bag",
    price: 80,
    oldPrice: 100,
    category: "Bags",
    color: "Brown",
    size: "XL",
    image: "/assets/images__3_-removebg-preview.png",
  },
  {
    id: 23,
    name: "Louis Philippe Sport",
    brand: "Polo Collar T-Shirt",
    price: 50,
    oldPrice: 55,
    category: "Men",
    color: "gray",
    size: "M",
    image: "/assets/images__4_-removebg-preview.png",
  },
  {
    id: 24,
    name: "Adidas",
    brand: "Men adi-dash Running Shoes",
    price: 60,
    oldPrice: 75,
    category: "Men",
    color: "gray",
    size: "L",
    image: "/assets/download__1_-removebg-preview.png",
  },
  {
    id: 25,
    name: "Trendyol",
    brand: "Floral Embroidered Maxi Dress",
    price: 35,
    oldPrice: 45,
    category: "Women",
    color: "blue",
    size: "S",
    image: "/assets/images__5_-removebg-preview.png",
  },
  {
    id: 26,
    name: "YK Disney",
    brand: "Girls Pink Moana Printed Dress",
    price: 80,
    oldPrice: 100,
    category: "Kids",
    color: "black",
    size: "S",
    image: "/assets/dress-removebg-preview.png",
  },
  {
    id: 27,
    name: "US Polo",
    brand: "Tailored Cotton Casual Shirt",
    price: 40,
    oldPrice: 50,
    category: "Men",
    color: "Red",
    size: "XXL",
    image: "/assets/T-shirt-removebg-preview.png",
  },
  {
    id: 28,
    name: "Zyla",
    brand: "Women Sandals",
    price: 35,
    oldPrice: 50,
    category: "Women",
    color: "Black",
    size: "L",
    image: "/assets/sandal-removebg-preview.png",
  },
  {
    id: 29,
    name: "Allen Solly",
    brand: "Brown Leather Jacket",
    price: 60,
    oldPrice: 70,
    category: "Winter Wear",
    color: "Brown",
    size: "XXXL",
    image: "/assets/leather-jacket-removebg-preview.png",
  },
  {
    id: 30,
    name: "US Polo",
    brand: "Cauual Show for Men",
    price: 40,
    oldPrice: 50,
    category: "Men",
    color: "Brown",
    size: "M",
    image: "/assets/brownsho-removebg-preview.png",
  },
  {
    id: 31,
    name: "Gucci",
    brand: "Brown Leather Jacket",
    price: 40,
    oldPrice: 60,
    category: "Leather Hand Purse",
    color: "Red",
    size: "S",
    image: "/assets/Bag-removebg-preview.png",
  },
  {
    id: 32,
    name: "Road Star",
    brand: "Printed Blazer",
    price: 60,
    oldPrice: 70,
    category: "Women",
    color: "Black",
    size: "XXL",
    image: "/assets/images__6_-removebg-preview.png",
  },
  {
    id: 33,
    name: "YK Diseny",
    brand: "Red Printed T-Shirt",
    price: 30,
    oldPrice: 35,
    category: "Men",
    color: "red",
    size: "XL",
    image: "/assets/beer-removebg-preview.png",
  },
  {
    id: 34,
    name: "Flora",
    brand: "Leather Hand Purse",
    price: 30,
    oldPrice: 35,
    category: "Women",
    color: "Brown",
    size: "S",
    image: "/assets/images__7_-removebg-preview.png",
  },
];

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        <Sidebar
          products={allProducts}
          setFilteredProducts={setFilteredProducts}
        />

        <main className="flex-1 p-6 flex flex-col">
          <div className="grid grid-cols-3 gap-4">
            {currentProducts.map((item) => (
              <div
                key={item.id}
                className="group rounded transition flex flex-col"
              >
                <div className="bg-gray-50 hover:bg-[#F3F3F3] rounded h-[330px] p-3 relative flex flex-col justify-between">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-80 w-full object-contain mb-3"
                  />

                  <div className="absolute top-3 right-1 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button className="bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-black hover:text-white transition">
                      <FaRegStar size={16} />
                    </button>
                    <button className="bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-black hover:text-white transition">
                      <FaExchangeAlt size={16} />
                    </button>
                    <button className="bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-black hover:text-white transition">
                      <FaRegEye size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[80%] opacity-0 group-hover:opacity-100 transition">
                    <button className="cursor-pointer w-full bg-white text-black py-1.5 rounded-lg hover:bg-black hover:text-white transition text-sm">
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
              className="px-4 py-2  disabled:opacity-50 text-gray-300 hover:text-black transition"
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
              className="px-4 py-2  disabled:opacity-50 text-gray-300 hover:text-black transition"
            >
              <FaArrowRight />
            </button>
          </div>
        </main>
      </div>

      <MyIcons />
      <Footer />
    </div>
  );
}
