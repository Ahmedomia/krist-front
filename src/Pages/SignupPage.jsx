import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const signup = useUserStore((state) => state.signup);
 
const handleSubmit = (e) => {
  e.preventDefault();

  const newUser = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    firstName,
    lastName,
    email,
    password,
  };

  signup(newUser);
  console.log("Signed up:", newUser);
  navigate("/login");
};

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-[60%] flex-col relative">
        <div className="absolute top-6 left-6 text-4xl font-bold flex items-center gap-2 z-10">
          <img src="/assets/Group.svg" alt="Logo" className="h-8" />
          <span>Krist</span>
        </div>
        <img
          src="/assets/Rectangle.svg"
          alt="Signup Illustration"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full md:w-[40%] flex items-center justify-center px-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h1 className="text-3xl font-bold mb-2">Create New Account</h1>
          <p className="text-gray-500 mb-6">Please enter details</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your First Name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your Last Name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="robertfox@example.com"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-black" required />I agree
              to the <span className="font-bold">Terms & Conditions</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
