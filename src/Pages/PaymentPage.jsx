import { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import OrderSummary from "../Components/OrderSummary";
import usePaymentStore from "../store/PaymentStore";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState({});
  const setCardDetails = usePaymentStore((state) => state.setCardDetails);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (paymentMethod === "card") {
      const newErrors = {};
      if (!cardNumber) newErrors.cardNumber = "Card Number is required";
      if (!cardName) newErrors.cardName = "Cardholder Name is required";
      if (!expiry) newErrors.expiry = "Expiry Date is required";
      if (!cvv) newErrors.cvv = "CVV is required";

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return;
      console.log("card data:", cardNumber);
      setCardDetails({ cardNumber, cardName, expiry, cvv });
    } else {
      setErrors({});
      setCardDetails({ method: paymentMethod });
    }

    navigate("/ReviewPage");
  };

  return (
    <>
      <Header />
      <h1 className="pl-22 p-8 font-semibold text-3xl ">Payment Method</h1>
      <div className="p-6 lg:px-18 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="relative flex justify-between items-center mb-8 w-full">
            <div className="absolute top-1/3 left-0 right-0 flex -z-10">
              <div className="w-1/2 border-t-2 border-dashed border-black"></div>
              <div className="w-1/2 border-t-2 border-dashed border-gray-200"></div>
            </div>
            <div className="flex flex-col items-center bg-white px-2">
              <span className="material-symbols-outlined text-3xl bg-black text-gray-300 p-2 rounded-xl">
                home
              </span>
              <span className="text-sm mt-1">Address</span>
            </div>
            <div className="flex flex-col items-center bg-white px-2">
              <span className="material-symbols-outlined text-3xl bg-black text-gray-300 p-2 rounded-xl">
                credit_card
              </span>
              <span className="text-sm mt-1">Payment</span>
            </div>
            <div className="flex flex-col items-center bg-white px-2">
              <span className="material-symbols-outlined text-3xl bg-gray-300 p-2 rounded-xl">
                description
              </span>
              <span className="text-sm mt-1">Review</span>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-4">
            Select a payment method
          </h2>

          <div className="p-4">
            <label className="flex items-center mb-2 cursor-pointer font-bold">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="mr-2"
              />
              Debit / Credit Card
            </label>
            {paymentMethod === "card" && (
              <div className="space-y-6 mt-4 pb-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="w-full border rounded-xl px-3 py-2"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Card Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Cardholder Name"
                    className="w-full border rounded-xl px-3 py-2"
                  />
                  {errors.cardName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.cardName}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <label className="block mb-1 text-sm font-medium">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full border rounded-xl px-3 py-2"
                    />
                    {errors.expiry && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.expiry}
                      </p>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-1 text-sm font-medium">
                      CVV
                    </label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="CVV"
                      maxLength={3}
                      className="w-full border rounded-xl px-3 py-2"
                    />
                    {errors.cvv && (
                      <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <label className="flex items-center mb-2 cursor-pointer font-bold">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "gpay"}
                onChange={() => setPaymentMethod("gpay")}
                className="mr-2"
              />
              Google Pay
            </label>
            <label className="flex items-center mb-2 cursor-pointer font-bold">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
                className="mr-2"
              />
              Paypal
            </label>
            <label className="flex items-center cursor-pointer font-bold">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="mr-2"
              />
              Cash on Delivery
            </label>
          </div>

          <button
            onClick={handleContinue}
            className="bg-black text-white w-[50%] py-3 rounded-xl"
          >
            Continue
          </button>
        </div>

        <OrderSummary showCheckoutButton={false} showPlaceOrderButton={false} />
      </div>
      <Footer />
    </>
  );
}
