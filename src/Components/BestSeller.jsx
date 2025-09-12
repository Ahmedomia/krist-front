import { FaRegStar, FaExchangeAlt, FaRegEye } from "react-icons/fa";

const bestSellers = [
  {
    name: "Roadstar",
    brand: "Printed Cotton T-Shirt",
    price: "$38.00",
    oldPrice: "$40.00",
    image: "/assets/bobby-lee-t-shirts-removebg-preview.png",
  },
  {
    name: "Allen Solly",
    brand: "Women Textured Handheld Bag",
    price: "$80.00",
    oldPrice: "$100.00",
    image: "/assets/images__3_-removebg-preview.png",
  },
  {
    name: "Louis Philippe Sport",
    brand: "Polo Collar T-Shirt",
    price: "$50.00",
    oldPrice: "$55.00",
    image: "/assets/images__4_-removebg-preview.png",
  },
  {
    name: "Adidas",
    brand: "Men adi-dash Running Shoes",
    price: "$60.00",
    oldPrice: "$75.00",
    image: "/assets/download__1_-removebg-preview.png",
  },
  {
    name: "Trendyol",
    brand: "Floral Embroidered Maxi Dress",
    price: "$35.00",
    oldPrice: "$45.00",
    image: "/assets/images__5_-removebg-preview.png",
  },
  {
    name: "YK Disney",
    brand: "Girls Pink Moana Printed Dress",
    price: "$80.00",
    oldPrice: "$100.00",
    image: "/assets/dress-removebg-preview.png",
  },
  {
    name: "US Polo",
    brand: "Tailored Cotton Casual Shirt",
    price: "$40.00",
    oldPrice: "$50.00",
    image: "/assets/T-shirt-removebg-preview.png",
  },
  {
    name: "Zyla",
    brand: "Women Sandals",
    price: "$35.00",
    oldPrice: "$50.00",
    image: "/assets/sandal-removebg-preview.png",
  },
];

export default function BestSeller() {
  return (
    <div className="w-full max-w-[1100px] mx-auto mt-16 pb-8">
      <div className="flex justify-center items-center mb-10">
        <h2 className="text-2xl font-bold">Our Bestseller</h2>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {bestSellers.map((item, index) => (
          <div key={index} className="group rounded transition flex flex-col">
            <div key={index} className="group rounded transition flex flex-col">
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
                  <button className="bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-black hover:text-white transition">
                    <FaRegEye size={16} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] opacity-0 group-hover:opacity-100 transition">
                  <button className="cursor-pointer w-full bg-white text-black py-2 rounded-lg hover:bg-black hover:text-white transition">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-4 text-center cursor-default">
                <p className="text-base font-semibold">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.brand}</p>
                <div className="flex gap-2 items-center justify-center mt-1">
                  <span className="text-lg font-bold text-black">
                    {item.price}
                  </span>
                  {item.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      {item.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
