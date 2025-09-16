import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password changed:", password);
    setSuccess(true);
  };

  return (
    <div className="flex h-screen relative">
      <div className="hidden md:flex w-[60%] flex-col relative">
        <div className="absolute top-6 left-6 text-4xl font-bold flex items-center gap-2 z-10">
          <img src="/assets/Group.svg" alt="Logo" className="h-8" />
          <span>Krist</span>
        </div>
        <img
          src="/assets/Rectangle2.svg"
          alt="Reset Password Illustration"
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

          <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
          <p className="text-gray-500 mb-6">
            Enter your new password below. Make sure it’s different from your
            old one.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 
                         focus:outline-none focus:border-black focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 
                         focus:outline-none focus:border-black focus:ring-2 focus:ring-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg 
                       hover:bg-gray-900 active:scale-[0.98] transition"
          >
            Change Password
          </button>
        </form>
      </div>
      {success && (
        <div className="fixed inset-0 bg-[rgba(164,161,170,0.2)] backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white shadow-lg p-8 text-center w-[90%] max-w-md rounded-lg">
            <div className="relative flex justify-center mb-6 h-[100px]">
              <div className="bg-gray-100 w-[100px] h-[100px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="bg-gray-200 w-[80px] h-[80px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="bg-black w-[60px] h-[60px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                  src="/assets/search 4.svg"
                  alt="check logo"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Password Changed Successfully
            </h2>
            <p className="text-gray-500 mb-6">
              Your password has been updated successfully
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
