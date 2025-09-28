import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import api from "../../api";
import useUserStore from "../store/userStore";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const user = useUserStore((state) => state.user);

  const handleSubscribe = async () => {
    try {
      const { data } = await api.post("/subscribe", { email });
      setMessage("✅ " + data.message);
      setEmail("");
    } catch (err) {
      setMessage("❌ Failed to subscribe");
      console.error(err);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <img src="/assets/GroupWhite.svg" alt="Logo" className="h-8" />
            <h2 className="cursor-default font-semibold text-4xl">Krist</h2>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-[14px]">
            <img src="/assets/phone.svg" alt="Phone" className="h-4 w-4" />
            <a href="tel:+2010404550" className="hover:text-white">
              (20) 1040455096
            </a>
          </div>

          <div className="flex items-center gap-2 text-gray-300 text-[14px]">
            <img src="/assets/gmail.svg" alt="Email" className="h-4 w-4" />
            <a
              href="mailto:ahmed.omaia12@gmail.com"
              className="hover:text-white"
            >
              ahmed.omaia12@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-[14px]">
            <img
              src="/assets/location.svg"
              alt="Location"
              className="h-4 w-4"
            />
            <a
              href="https://www.google.com/maps/@29.9712531,31.2640561,12z?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              3891 Ranchview Dr. Richardson, California 62639
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Information</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="/ProfilePage" className="hover:text-white">
                My Account
              </a>
            </li>
            {!user && (
              <li>
                <a href="/user/login" className="hover:text-white">
                  Login
                </a>
              </li>
            )}
            <li>
              <a href="/CheckoutPage" className="hover:text-white">
                My Cart
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Service</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-and-conditions" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 cursor-default">
              Subscribe
            </h3>
            <p className="text-sm font-light text-gray-300 mb-4 cursor-default max-w-md">
              Enter your email below to be the first to know about new
              collections and product launches.
            </p>

            <div className="flex items-center rounded-lg border overflow-hidden w-full max-w-md">
              <img
                src="/assets/gmail.svg"
                alt="gmail logo"
                className="h-4 w-4 ml-2"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="flex-1 px-3 py-2 outline-none text-sm text-[#FDFDFD]"
              />
              <button
                onClick={handleSubscribe}
                className="bg-black text-white px-4 py-2 cursor-pointer transition"
              >
                <FaArrowRight />
              </button>
            </div>
            {message && <p className="text-sm mt-2">{message}</p>}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-4 text-sm text-gray-500 mr-14 ml-14 flex items-center relative">
        <div className="flex items-center gap-4">
          <img src="/assets/Visa.svg" alt="Visa logo" className="h-6" />
          <img
            src="/assets/Mastercard.svg"
            alt="Mastercard logo"
            className="h-6"
          />
          <img
            src="/assets/GooglePay.svg"
            alt="GooglePay logo"
            className="h-6"
          />
          <img src="/assets/Amex.svg" alt="Amex logo" className="h-6" />
          <img src="/assets/PayPal.svg" alt="PayPal logo" className="h-6" />
        </div>
        <p className="pl-70 cursor-default text-white">
          © {new Date().getFullYear()} Krist. All Rights Reserved.
        </p>
        <div className="flex space-x-4 absolute right-0">
          <a href="#" className="hover:text-gray-500 text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-gray-500 text-white">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-500 text-white">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}
