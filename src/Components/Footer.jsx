import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function Footer() {
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
            <p>(704) 555-0127</p>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-[14px]">
            <img src="/assets/gmail.svg" alt="Phone" className="h-4 w-4" />
            <p>krist@example.com</p>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-[14px]">
            <img
              src="/assets/location.svg"
              alt="location"
              className="h-4 w-4"
            />
            <p>3891 Ranchview Dr. Richardson, California 62639</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Information</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                My Account
              </a>
            </li>
            <li>
              <a href="/Login" className="hover:text-white">
                Login
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                My Cart
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                My Wishlist
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Checkout
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Service</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Delivery Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
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
                placeholder="Your Email"
                className="flex-1 px-3 py-2 outline-none text-sm text-[#FDFDFD]"
              />
              <button className="bg-black text-white px-4 py-2 cursor-pointer transition">
                <FaArrowRight />
              </button>
            </div>
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
        <p className="mx-auto cursor-default mr-120 text-white">
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
