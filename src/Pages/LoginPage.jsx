import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import api from "../../api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/users/login", { email, password });

      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));

      console.log("Logged in:", data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-[60%] flex-col relative bg-gray-200">
        <div className="absolute top-6 left-6 text-4xl font-bold flex items-center gap-2 z-10">
          <img src="/assets/Group.svg" alt="Logo" className="h-8" />
          <a href="/">Krist</a>
        </div>
        <img
          src="/assets/Rectangle_3463273-removebg-preview.png"
          alt="Login Illustration"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="w-full md:w-[40%] flex items-center justify-center px-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <h1 className="text-3xl font-bold mb-2">
            Welcome <span className="inline-block">👋</span>
          </h1>
          <p className="text-gray-500 mb-6">Please login here</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
              <input type="checkbox" className="accent-black" />
              Remember Me
            </label>
            <a
              href="/users/forgot-password"
              className="text-gray-600 hover:text-black"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/users/signup")}
            type="button"
            className="w-full bg-white text-black border py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
