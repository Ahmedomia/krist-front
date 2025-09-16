import { useEffect, useState } from "react";
import useCheckoutStore from "../store/useCheckoutStore";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import OrderSummary from "../Components/OrderSummary";
import { useNavigate } from "react-router-dom";

export default function ShippingPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    addresses,
    selectedAddressId,
    loadAddresses,
    selectAddress,
    addAddress,
    deleteAddress,
    editAddress,
  } = useCheckoutStore();

  const [newAddress, setNewAddress] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pin: "",
    state: "",
  });

  const [editingAddressId, setEditingAddressId] = useState(null);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const handleSaveAddress = () => {
    if (!newAddress.name || !newAddress.mobile || !newAddress.address) {
      return alert("Please fill all required fields");
    }

    if (editingAddressId) {
      editAddress(editingAddressId, newAddress);
      setEditingAddressId(null);
    } else {
      addAddress(newAddress);
    }
    setNewAddress({
      name: "",
      mobile: "",
      address: "",
      city: "",
      pin: "",
      state: "",
    });
  };
  const handleDeliverHere = () => {
    if (!selectedAddressId) {
      setMessage("Please select an address first.");
      return;
    }
    const selected = addresses.find((a) => a.id === selectedAddressId);

    if (selected) {
      setMessage("");
      navigate("/PaymentPage");
    }
  };

  return (
    <>
      <Header />
      <h1 className="pl-22 p-8 font-semibold text-3xl ">Shipping Address</h1>
      <div className="p-6 pr-18 pl-18 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative flex justify-between items-center mb-6 w-full">
            <div className="absolute top-1/3 left-0 right-0 border-t-2 border-dashed border-gray-200 -z-10" />
            <div className="flex flex-col items-center bg-white px-2">
              <span className="material-symbols-outlined text-3xl bg-black text-gray-300 p-2 rounded-xl">
                home
              </span>
              <span className="text-sm mt-1">Address</span>
            </div>
            <div className="flex flex-col items-center bg-white px-2">
              <span className="material-symbols-outlined text-3xl bg-gray-300 p-2 rounded-xl">
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

          <h2 className="text-xl font-semibold mb-4">
            Select a delivery address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[800px]">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-4 border rounded flex flex-col relative ${
                  selectedAddressId === addr.id
                    ? "border-black shadow"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAddressId === addr.id}
                  onChange={() => selectAddress(addr.id)}
                  className="absolute top-4 right-4 w-5 h-5 accent-black cursor-pointer"
                />
                <p className="font-semibold">{addr.name}</p>
                <p className="text-sm text-gray-600">{addr.address}</p>
                <p className="text-sm text-gray-600">
                  {addr.city}, {addr.state} - {addr.pin}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">
                    call
                  </span>
                  {addr.mobile}
                </p>
                <div className="flex mt-2 gap-4">
                  <button
                    onClick={() => {
                      setEditingAddressId(addr.id);
                      setNewAddress({
                        name: addr.name,
                        mobile: addr.mobile,
                        address: addr.address,
                        city: addr.city,
                        pin: addr.pin,
                        state: addr.state,
                      });
                    }}
                    className="flex items-center justify-center gap-2 w-full h-[40px] text-black bg-gray-200 rounded cursor-pointer"
                  >
                    <span className="material-symbols-outlined">
                      edit_square
                    </span>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="flex items-center justify-center gap-2 w-full h-[40px] text-red-400 bg-red-200 rounded cursor-pointer"
                  >
                    <img
                      src="/assets/trashred-svgrepo-com.svg"
                      alt="Delete Red"
                      className="w-6 h-6"
                    />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 col-span-2 w-[50%]">
              <button
                onClick={handleDeliverHere}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 cursor-pointer"
              >
                Deliver Here
              </button>
              {message && (
                <p className="mt-3 text-sm text-red-600">{message}</p>
              )}
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-6 mb-3">
            {editingAddressId ? "Edit address" : "Add a new address"}
          </h2>
          <div className="space-y-2">
            <label>Name</label>
            <input
              placeholder="Enter Name"
              value={newAddress.name}
              onChange={(e) =>
                setNewAddress({ ...newAddress, name: e.target.value })
              }
              className="border p-2 rounded-xl w-full"
            />
            <label>Mobile Number</label>
            <input
              placeholder="Enter Mobile Number"
              value={newAddress.mobile}
              onChange={(e) =>
                setNewAddress({ ...newAddress, mobile: e.target.value })
              }
              className="border p-2 rounded-xl w-full"
            />
            <label>Flat, House no., Building</label>
            <input
              placeholder="Flat, House no., Building"
              value={newAddress.address}
              onChange={(e) =>
                setNewAddress({ ...newAddress, address: e.target.value })
              }
              className="border p-2 rounded-xl w-full"
            />
            <label>City</label>
            <input
              placeholder="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              className="border p-2 rounded-xl w-full"
            />
            <label>Pin Code</label>
            <input
              placeholder="Pin Code"
              value={newAddress.pin}
              onChange={(e) =>
                setNewAddress({ ...newAddress, pin: e.target.value })
              }
              className="border p-2 rounded-xl w-full"
            />
            <label>State</label>
            <input
              placeholder="State"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
              className="border p-2 rounded-xl w-full"
            />

            <button
              onClick={handleSaveAddress}
              className="bg-black text-white px-4 py-2 rounded"
            >
              {editingAddressId ? "Update Address" : "Save Address"}
            </button>
          </div>
        </div>

        <OrderSummary showCheckoutButton={false} showPlaceOrderButton={false} />
      </div>
      <Footer />
    </>
  );
}
