import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Sarah Johnson",
    profile: "",
    review:
      "Amazing quality! The material feels premium and delivery was super fast.",
    rating: 5,
  },
  {
    name: "Michael Lee",
    profile: "",
    review: "Very comfortable and stylish. I’ll definitely buy again.",
    rating: 4,
  },
  {
    name: "Emily Carter",
    profile: "",
    review: "Worth every penny! The color is exactly as shown in the picture.",
    rating: 5,
  },
  {
    name: "James Brown",
    profile: null,
    review: "Good product but the packaging could be better.",
    rating: 3,
  },
  {
    name: "Sophia Martinez",
    profile: "",
    review: "Love it! Got so many compliments already.",
    rating: 5,
  },
];

export default function ReviewsCards() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 3;

  const next = () => {
    setStartIndex((prev) =>
      prev + visibleCards < reviews.length ? prev + visibleCards : 0
    );
  };

  const prev = () => {
    setStartIndex((prev) =>
      prev - visibleCards >= 0
        ? prev - visibleCards
        : reviews.length - visibleCards
    );
  };

  const visibleReviews = reviews.slice(startIndex, startIndex + visibleCards);

  return (
    <div className="bg-[#F3F3F3] p-1">
      <div className="w-full max-w-[1100px] mx-auto mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl">What our Customers say's</h2>
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

        <div className="grid grid-cols-3 gap-6 pb-8">
          {visibleReviews.map((review, index) => (
            <div
              key={index}
              className="rounded shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between bg-white"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-black mb-6 text-[12px]">"{review.review}"</p>
              <div className="flex items-center gap-3 mt-auto">
                {review.profile ? (
                  <img
                    src={review.profile}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                )}
                <p className="font-semibold text-black">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
