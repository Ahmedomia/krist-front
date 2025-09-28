import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import api from "../../api";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

export default function OTPPage() {
  const user = useUserStore((state) => state.user);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("emailForReset");

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    try {
      const { data } = await api.post("/users/verify-otp", {
        email,
        otp: otpValue,
      });

      console.log("OTP Verified:", data);

      localStorage.setItem("otpFromUserInput", data.resetToken);
      localStorage.setItem("emailForReset", email);

      navigate("/users/update-password");
    } catch (err) {
      console.error("Error verifying OTP:", err);

      Swal.fire({
        icon: "error",
        title: "OTP Verification Failed",
        text:
          err.response?.data?.message ||
          "Failed to verify OTP. Please try again.",
        confirmButtonColor: "#000",
      });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-[60%] flex-col relative">
        <div className="absolute top-6 left-6 text-4xl font-bold flex items-center gap-2 z-10">
          <img src="/assets/Group.svg" alt="Logo" className="h-8" />
          <a href="/">Krist</a>
        </div>
        <img
          src="/assets/Rectangle3.svg"
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

          <h1 className="text-3xl font-bold mb-2">Enter OTP</h1>
          <p className="text-gray-500 mb-6">
            We have sent a 6-digit code to your registered email
            <span className="font-medium"> {user?.email}</span>
          </p>
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 border border-gray-200 text-center text-lg rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
