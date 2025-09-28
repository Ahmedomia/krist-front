import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import MyIcons from "../Components/Icons";
import { FaHeart, FaExchangeAlt, FaRegEye, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { fetchProductById, fetchRelatedProducts } from "../../api";
import Skeleton from "react-loading-skeleton";
import useWishlistStore from "../store/wishlistStore";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const [relatedproducts, setRelatedProducts] = useState([]);

  const wishlist = useWishlistStore((state) => state.wishlist);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const loadWishlist = useWishlistStore((state) => state.loadWishlist);

  const [notification, setNotification] = useState("");

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const handleWishlistToggle = async (item) => {
    try {
      const exists = wishlist.some((w) => w.productId?._id === item._id);

      if (exists) {
        await removeFromWishlist(item._id);
        setNotification(`${item.name} removed from favourites ❌`);
      } else {
        await addToWishlist(item);
        setNotification(`${item.name} added to favourites ❤️`);
      }

      setTimeout(() => setNotification(""), 2000);
    } catch (err) {
      setNotification("Wishlist action failed");
      console.error(err);
      setTimeout(() => setNotification(""), 2000);
    }
  };

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const { data } = await fetchRelatedProducts(product._id);
        setRelatedProducts(data);
      } catch (err) {
        console.error("Failed to load related products:", err);
      }
    };

    if (product) loadRelated();
  }, [product]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductById(id);
        setProduct(data);
        setSelectedImage(data.image || "");
        setSelectedColor(data.colors?.[0] || null);
        setSelectedSize(data.sizes?.[0] || null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Skeleton height={500} />
            <div className="flex gap-4 mt-4">
              <Skeleton width={80} height={80} count={3} />
            </div>
          </div>

          <div>
            <Skeleton width={200} height={30} />
            <Skeleton width={150} height={20} className="mt-2" />
            <Skeleton width={300} height={25} className="mt-4" />
            <Skeleton count={4} className="mt-2" />
            <Skeleton width={120} height={40} className="mt-6 rounded-xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Product not found"}
      </div>
    );
  }

  const images = [product?.image, product?.image2].filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[500px] object-contain"
          />
          <div className="flex gap-4 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-contain rounded cursor-pointer border-2 ${
                  selectedImage === img ? "border-black" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">{product.brand}</h1>
            {selectedSize && product.inStockSizes.includes(selectedSize) ? (
              <span className="text-green-600 font-semibold text-sm bg-[#EBFAEB] p-2 rounded">
                In Stock
              </span>
            ) : (
              <span className="text-red-500 font-semibold text-sm bg-red-50 rounded p-2">
                Out of Stock
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <p className="text-gray-600">{product.name}</p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < Math.round(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviews} Reviews)
            </span>
          </div>
          <div className="flex gap-3 items-center mb-6">
            <span className="text-2xl font-bold">${product.price}</span>
            <span className="text-gray-400 line-through">
              ${product.oldPrice}
            </span>
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Color</h4>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded border-1 ${
                    selectedColor === color ? "border-black" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Size</h4>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 cursor-pointer"
              >
                -
              </button>
              <span className="px-4 cursor-default">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-3 cursor-pointer"
              >
                +
              </button>
            </div>
            <button
              onClick={() =>
                addToCart(
                  {
                    id: product._id,
                    name: product.name,
                    brand: product.brand,
                    price: product.price,
                    image: selectedImage,
                    color: selectedColor,
                    size: selectedSize,
                  },
                  quantity
                )
              }
              disabled={
                !selectedSize || !product.inStockSizes.includes(selectedSize)
              }
              className={`px-26 py-3 rounded-xl transition ${
                !selectedSize || !product.inStockSizes.includes(selectedSize)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900 cursor-pointer"
              }`}
            >
              Add to Cart
            </button>
            <span className="material-symbols-outlined border px-4 py-3 rounded-xl hover:bg-black hover:text-white cursor-pointer">
              favorite
            </span>
          </div>
        </div>
      </main>
      <div className="p-10">
        <div className="border-b mb-4 flex gap-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 font-semibold ${
              activeTab === "description"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("info")}
            className={`pb-2 font-semibold ${
              activeTab === "info"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Additional Information
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-2 font-semibold ${
              activeTab === "reviews"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Reviews
          </button>
        </div>
        <div className="text-gray-600">
          {activeTab === "description" && <p>{product.description}</p>}

          {activeTab === "info" && (
            <div>
              <p>
                <strong>Color:</strong> {product.colors.join("/")}
              </p>
              <p>
                <strong>Size:</strong> {product.sizes.join(" / ")}
              </p>
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-2">Customer Reviews</p>
                {reviews.length === 0 ? (
                  <p>No reviews yet. Be the first to review this product!</p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((r, i) => (
                      <div
                        key={i}
                        className="border-b p-4 border-gray-200 flex gap-4 items-start"
                      >
                        {r.image ? (
                          <img
                            src={r.image}
                            alt={r.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold text-lg">
                            {r.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold mb-2">{r.name}</p>
                          <div className="flex items-center gap-2 mb-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <FaStar
                                key={j}
                                className={`text-xl ${
                                  j < r.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="mt-2">{r.text}</p>
                          <p className="mt-2 text-sm">
                            <span className="text-gray-300">Posted on </span>
                            {r.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newReview = {
                    name: reviewName,
                    email: reviewEmail,
                    text: reviewText,
                    rating: selectedRating,
                    date: new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }),
                  };
                  setReviews([...reviews, newReview]);
                  setReviewName("");
                  setReviewEmail("");
                  setReviewText("");
                  setSelectedRating(0);
                }}
                className="space-y-4 max-w-lg"
              >
                <div>
                  <label className="block font-semibold mb-1">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`cursor-pointer text-2xl ${
                          i < (selectedRating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => setSelectedRating(i + 1)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your Name"
                    className="w-[1300px] border rounded px-3 py-2"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your Email"
                    className="w-[1300px] border rounded px-3 py-2"
                    value={reviewEmail}
                    onChange={(e) => setReviewEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    placeholder="Enter your Review"
                    rows="4"
                    className="w-[1300px] border rounded px-3 py-2"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>
                <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition">
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-[1100px] mx-auto mt-8 pb-8">
        <div className="flex mb-10">
          <h2 className="text-3xl font-semibold">Related Products</h2>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col">
                  <Skeleton height={300} />
                  <Skeleton width={150} height={20} className="mt-2" />
                  <Skeleton width={100} height={15} />
                </div>
              ))
            : relatedproducts.map((item) => (
                <div
                  key={item._id}
                  className="group rounded transition flex flex-col cursor-pointer"
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
                          wishlist.includes(item._id)
                            ? "bg-red-500 text-white"
                            : "bg-white hover:bg-black hover:text-white"
                        }`}
                      >
                        <FaHeart />
                      </button>
                      {notification && (
                        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition">
                          {notification}
                        </div>
                      )}
                      <button className="bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-black hover:text-white transition">
                        <FaExchangeAlt size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${item._id}`);
                        }}
                        className="bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-black hover:text-white transition"
                      >
                        <FaRegEye size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] opacity-0 group-hover:opacity-100 transition">
                      <button className="cursor-pointer w-full bg-white text-black py-2 rounded-lg hover:bg-black hover:text-white transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="p-4 text-center cursor-pointer"
                  >
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
      <MyIcons />
      <Footer />
    </div>
  );
}
