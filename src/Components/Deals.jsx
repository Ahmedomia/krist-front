import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Deals() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({
    days: 120,
    hours: 12,
    minutes: 30,
    seconds: 45,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center bg-white pb-8">
      <div className="relative w-[1250px] h-[350px] flex justify-between items-center px-20 overflow-hidden transition-all duration-700">
        <div className="max-w-md z-10 m-6 w-[800px]">
          <p className="text-3xl font-medium text-black cursor-default mb-4">
            Deals of the Month
          </p>

          <h2 className="mb-4 text-sm cursor-default text-gray-700 w-[600px]">
            It's a long established fact that the reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has more-or-less normal distribution
            of letters.
          </h2>
          <div className="flex gap-4 justify-start mb-4">
            <div className="bg-white text-black px-4 py-2 border border-black/10 rounded-lg text-center w-[72px]">
              <p className="text-xl font-bold">{timeLeft.days}</p>
              <span className="text-sm">Days</span>
            </div>
            <div className="bg-white text-black px-4 py-2 border border-black/10 rounded-lg text-center w-[72px]">
              <p className="text-xl font-bold">{timeLeft.hours}</p>
              <span className="text-sm">Hrs</span>
            </div>
            <div className="bg-white text-black px-4 py-2 border border-black/10 rounded-lg text-center w-[72px]">
              <p className="text-xl font-bold">{timeLeft.minutes}</p>
              <span className="text-sm">Min</span>
            </div>
            <div className="bg-white text-black px-4 py-2 border border-black/10 rounded-lg text-center w-[72px]">
              <p className="text-xl font-bold">{timeLeft.seconds}</p>
              <span className="text-sm">Sec</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/ShopPage")}
            className="mt-8 bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
          >
            View All Products
            <FaArrowRight size={12} className="translate-y-[2px]" />
          </button>
        </div>
        <img
          src="/assets/Group-7-2.png"
          alt="deal image"
          className="h-[500px] object-contain mt-26"
        />
      </div>
    </div>
  );
}
