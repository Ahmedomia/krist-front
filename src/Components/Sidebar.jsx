import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Sidebar({ products = [], setFilteredProducts }) {
  const [openCategories, setOpenCategories] = useState(false);
  const [openColors, setOpenColors] = useState(false);
  const [openSizes, setOpenSizes] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState(2000);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const categories = [
    "Men",
    "Women",
    "Kids",
    "Bags",
    "Belts",
    "Wallets",
    "Watches",
    "Accessories",
    "Winter Wear",
  ];

  const colors = ["red", "blue", "orange", "black", "green", "yellow ", "Brown"];
  const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const colorCounts = colors.reduce((acc, color) => {
    acc[color] = products.filter((p) => p.color === color).length;
    return acc;
  }, {});
  const sizeCounts = sizes.reduce((acc, size) => {
    acc[size] = products.filter((p) => p.size === size).length;
    return acc;
  }, {});
  const handleCategoryChange = (category) =>
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );

  const handleColorChange = (color) =>
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );

  const handleSizeChange = (size) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  useEffect(() => {
    if (!Array.isArray(products)) return;
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        (p) => p.category && selectedCategories.includes(p.category)
      );
    }

    filtered = filtered.filter(
      (p) => typeof p.price === "number" && p.price <= price
    );

    if (selectedColors.length > 0) {
      filtered = filtered.filter(
        (p) => p.color && selectedColors.includes(p.color)
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(
        (p) => p.size && selectedSizes.includes(p.size)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, price, selectedColors, selectedSizes, products]);

  return (
    <aside className="w-64 bg-white p-6 space-y-8">
      <div>
        <h3
          className="text-lg font-semibold mb-4 flex items-center justify-between cursor-pointer"
          onClick={() => setOpenCategories(!openCategories)}
        >
          Product Categories
          {openCategories ? <FaChevronUp /> : <FaChevronDown />}
        </h3>

        {openCategories && (
          <ul className="space-y-2 text-gray-700">
            {categories.map((cat) => (
              <li key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                <span>{cat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
        <input
          type="range"
          min="0"
          max="2000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
        <p className="text-sm text-gray-500 mt-2">Price: $0 - ${price}</p>
      </div>
      <div>
        <h3
          className="text-lg font-semibold mb-4 flex items-center justify-between cursor-pointer"
          onClick={() => setOpenColors(!openColors)}
        >
          Filter by Color
          {openColors ? <FaChevronUp /> : <FaChevronDown />}
        </h3>

        {openColors && (
          <ul className="space-y-2">
            {colors.map((color) => (
              <li
                key={color}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleColorChange(color)}
              >
                <span
                  className={`w-5 h-5 rounded border ${
                    selectedColors.includes(color)
                      ? "ring-1 ring-black"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                ></span>
                <span className="capitalize">{color}</span>
                <span className="ml-auto text-gray-500">
                  ({colorCounts[color] || 0})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3
          className="text-lg font-semibold mb-4 flex items-center justify-between cursor-pointer"
          onClick={() => setOpenSizes(!openSizes)}
        >
          Filter by Size
          {openSizes ? <FaChevronUp /> : <FaChevronDown />}
        </h3>

        {openSizes && (
          <ul className="space-y-2">
            {sizes.map((size) => (
              <li
                key={size}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSizeChange(size)}
              >
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  readOnly
                />
                <span>{size}</span>
                <span className="ml-auto text-gray-500">
                  ({sizeCounts[size] || 0})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
