import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import OrderSummary from "../Components/OrderSummary";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useCheckoutStore from "../store/useCheckoutStore";
import usePaymentStore from "../store/PaymentStore";

export default function ReviewPage() {
  const { cartItems: localCartItems } = useCartStore();
  const { addresses: localAddresses, selectedAddressId: localAddressId } =
    useCheckoutStore();
  const { cardDetails: localPayment } = usePaymentStore();

  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const navigate = useNavigate();

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await api.get("/cart");
        setCartItems(data.length > 0 ? data : localCartItems);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
        setCartItems(localCartItems);
      }
    };

    const fetchAddresses = async () => {
      try {
        const { data } = await api.get("/addresses");
        setAddresses(data.length > 0 ? data : localAddresses);
        setSelectedAddressId(data.length > 0 ? data[0]._id : localAddressId);
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
        setAddresses(localAddresses);
        setSelectedAddressId(localAddressId);
      }
    };

    const fetchPayment = async () => {
      try {
        const { data } = await api.get("/payments");
        setPaymentInfo(data.length > 0 ? data[0] : localPayment);
      } catch (err) {
        console.error("Failed to fetch payment info:", err);
        setPaymentInfo(localPayment);
      }
    };

    fetchCart();
    fetchAddresses();
    fetchPayment();
  }, [localCartItems, localAddresses, localAddressId, localPayment]);

  return (
    <>
      <Header />
      <h1 className="pl-22 p-8 font-semibold text-3xl">Review Your Order</h1>

      <div className="p-6 pr-18 pl-18 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex items-center gap-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover bg-gray-100 p-2"
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
                {paymentInfo && paymentInfo.last4 ? (
                  <p className="text-sm font-bold pt-4">
                    {paymentInfo.cardName} (**** **** **** {paymentInfo.last4})
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
