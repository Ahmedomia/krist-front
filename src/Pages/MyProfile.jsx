import {
  Heart,
  MapPin,
  Bell,
  Settings,
  CreditCard,
  ShoppingBag,
  User,
  Edit,
} from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import useUserStore from "../store/userStore";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const [activeItem, setActiveItem] = useState("personal");

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
      });
    }
  }, [user]);
  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };
  const handleSave = () => {
    updateUser(profile);
  };

  const menuItems = [
    { id: "personal", label: "Personal Information", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "wishlist", label: "My Wishlists", icon: Heart },
    { id: "addresses", label: "Manage Addresses", icon: MapPin },
    { id: "cards", label: "Saved Cards", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (!user) return <p className="p-6">Please login to view your profile.</p>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-6 py-12 flex gap-12">
        <aside className="w-72 border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6 border-b border-gray-200 p-2">
            <img
              src={
                user.profilePic ||
                "https://randomuser.me/api/portraits/men/32.jpg"
              }
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-gray-500">Hello 👋</p>
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>

          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <li
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`flex items-center gap-2 cursor-pointer rounded p-2 transition ${
                    isActive
                      ? "bg-black text-white font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <button
              type="button"
              className="px-6 py-2 bg-black text-white rounded-lg flex items-center gap-2 cursor-pointer"
              onClick={handleSave}
            >
              <Edit size={16} /> Edit Profile
            </button>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-black/10"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-black/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-black/10"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-black/10"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-black/10"
              />
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
