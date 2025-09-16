import { useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import OrderSummary from "../Components/OrderSummary";
import useCartStore from "../store/cartStore";
import useCheckoutStore from "../store/useCheckoutStore";
import usePaymentStore from "../store/PaymentStore";
import { useNavigate } from "react-router-dom";

export default function ReviewPage() {
  const { cartItems } = useCartStore();
  const { addresses, selectedAddressId, loadAddresses } = useCheckoutStore();
  const { cardDetails } = usePaymentStore();
  const navigate = useNavigate();

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  return (
    <>
      <Header />
      <h1 className="pl-22 p-8 font-semibold text-3xl">Review Your Order</h1>

      <div className="p-6 pr-18 pl-18 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="relative flex justify-between items-center mb-6 w-full">
            <div className="absolute top-1/3 left-0 right-0 border-t-2 border-dashed border-black -z-10" />
            <div className="flex flex-col items-center bg-white px-2">
              <span className="material-symbols-outlined text-3xl bg-black text-white p-2 rounded-xl">
                home
              </span>
              <span className="text-sm mt-1">Address</span>
            </div>
            <div className="flex flex-col items-center bg-white px-2">
              <span className="material-symbols-outlined text-3xl bg-black text-white p-2 rounded-xl">
                credit_card
              </span>
              <span className="text-sm mt-1">Payment</span>
            </div>
            <div className="flex flex-col items-center bg-white px-2">
              <span className="material-symbols-outlined text-3xl bg-black text-white p-2 rounded-xl">
                description
              </span>
              <span className="text-sm mt-1">Review</span>
            </div>
          </div>
          <div className="space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover bg-gray-100 p-2 "
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">${item.price}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    {item.size && (
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items in your cart</p>
            )}
          </div>
          <div className="mt-6 border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl">Shipping Address</h3>
                {selectedAddress ? (
                  <>
                    <p className="text-lg font-bold pt-4">
                      {selectedAddress.name}
                    </p>
                    <p className="text-sm pt-2">{selectedAddress.address}</p>
                    <p className="text-sm pt-2">
                      {selectedAddress.city}, {selectedAddress.state} -{" "}
                      {selectedAddress.pin}
                    </p>
                    <p className="text-sm pt-2">{selectedAddress.mobile}</p>
                  </>
                ) : (
                  <p className="text-gray-500">No address selected</p>
                )}
              </div>
              <span
                onClick={() => navigate("/ShippingPage")}
                className="material-symbols-outlined cursor-pointer bg-gray-100 p-2 rounded-xl hover:bg-gray-200"
              >
                edit_square
              </span>
            </div>
          </div>
          <div className="mt-4 border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Payment Method</h3>
                {cardDetails && cardDetails.cardNumber ? (
                  <p className="text-sm font-bold pt-4 ">
                    {cardDetails.cardName} (**** **** ****{" "}
                    {cardDetails.cardNumber.slice(-4)})
                  </p>
                ) : (
                  <p className="text-gray-500">No payment method added</p>
                )}
              </div>
              <span
                onClick={() => navigate("/PaymentPage")}
                className="material-symbols-outlined cursor-pointer bg-gray-100 p-2 rounded-xl hover:bg-gray-200"
              >
                edit_square
              </span>
            </div>
          </div>
        </div>

        <OrderSummary showCheckoutButton={false} />
      </div>
      <Footer />
    </>
  );
}
