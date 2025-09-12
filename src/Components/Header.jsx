import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [shopOpen, setShopOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white relative z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <img src="/assets/Group.svg" alt="Logo" className="h-8" />
          <h2 className="cursor-default font-semibold text-4xl">Krist</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-gray-700 relative">
          <a href="#" className="hover:text-black">
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
        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-black">
            <img src="/assets/search.svg" alt="search" />
          </button>
          <button className="text-gray-700 hover:text-black">
            <img src="/assets/fav.svg" alt="favourite" />
          </button>
          <button className="text-gray-700 hover:text-black">
            <img src="/assets/cart.svg" alt="cart" />
          </button>
          <button
            onClick={() => navigate("/Login")}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Login
          </button>
        </div>
      </div>
      {shopOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setShopOpen(false)}
        ></div>
      )}
    </header>
  );
}
