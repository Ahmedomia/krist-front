import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";

export default function OrderSummary({
  showCheckoutButton = true,
  showPlaceOrderButton = true,
}) {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const cartItems = useCartStore((state) => state.cartItems);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = 5;
  const discount = appliedDiscount;
  const grandTotal = subtotal + deliveryCharge - discount;

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === "FLAT50") {
      setAppliedDiscount(50);
    } else {
      setAppliedDiscount(0);
    }
  };

  return (
    <aside className="bg-white border border-gray-200 rounded-lg p-6 h-fit shadow-sm">
      <div className="flex justify-between mb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-6">Subtotal</h3>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-2">Discount Code</label>
        <div className="flex">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Enter Code"
            className="flex-1 border rounded-l-lg px-3 py-2"
          />
          <button
            onClick={handleApplyDiscount}
            className="bg-black text-white px-4 rounded-r-lg"
          >
            Apply
          </button>
        </div>
        {discount > 0 ? (
          <p className="text-green-600 text-sm mt-1">
            Discount Applied: -${discount}
          </p>
        ) : discountCode ? (
          <p className="text-red-600 text-sm mt-1">Invalid Code</p>
        ) : null}
      </div>

      <div className="flex justify-between mb-2 pb-2 border-b border-gray-200">
        <span>Delivery Charge</span>
        <span>${deliveryCharge.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg mt-4 mb-6">
        <span>Grand Total</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>
      {showCheckoutButton && (
        <button
          onClick={() => navigate("/ShippingPage")}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Proceed to Checkout
        </button>
      )}
      {showPlaceOrderButton && (
        <button
          onClick={() => setShowPopup(true)}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      )}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 w-[500px] text-center rounded-lg relative">
            <div className="flex items-center justify-center relative mb-6">
              <div className="bg-gray-100 w-[100px] h-[100px] rounded-full absolute"></div>
              <div className="bg-gray-200 w-[80px] h-[80px] rounded-full absolute"></div>
              <div className="bg-black w-[60px] h-[60px] rounded-full flex items-center justify-center relative z-10">
                <span className="material-symbols-outlined text-white text-3xl">
                  shopping_bag_speed
                </span>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">
              Your order is confirmed
            </h2>
            <p className="text-gray-600 mb-6">
              Thanks for shopping! Your order hasn’t shipped yet, but we will
              send you an email when it’s done.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/orders");
                }}
                className="bg-black cursor-pointer text-white w-full px-6 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                View Order
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/");
                }}
                className="bg-white cursor-pointer text-black w-full px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Back Home
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
