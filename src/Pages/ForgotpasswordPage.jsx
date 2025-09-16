import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", email);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-[60%] flex-col relative">
        <div className="absolute top-6 left-6 text-4xl font-bold flex items-center gap-2 z-10">
          <img src="/assets/Group.svg" alt="Logo" className="h-8" />
          <span>Krist</span>
        </div>
        <img
          src="/assets/Rectangle2.svg"
          alt="Login Illustration"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full md:w-[40%] flex items-center justify-center px-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 text-black flex items-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-black">
              arrow_back_ios
            </span>
            Back
          </button>

          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-gray-500 mb-6">
            Enter your registered email address. we’ll send you a code to reset
            your password.
          </p>
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
          <button
            type="submit"
            onClick={() => navigate("/OTP")}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
