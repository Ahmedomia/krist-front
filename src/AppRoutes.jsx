import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import SignupPage from "./Pages/SignupPage";
import ForgotPassword from "./Pages/ForgotpasswordPage";
import OTPPage from "./Pages/OTPPage";
import NewPassword from "./Pages/NewpasswordPage";
import ProductDetail from "./Pages/ProductDetail";
import ProfilePage from "./Pages/MyProfile";
import CheckoutPage from "./Pages/CheckoutPage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import ReviewPage from "./Pages/ReviewPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/Forgotpassword" element={<ForgotPassword />} />
      <Route path="/OTP" element={<OTPPage />} />
      <Route path="/Newpassword" element={<NewPassword />} />
      <Route path="/ShopPage" element={<ShopPage />} />
      <Route path="/ProfilePage" element={<ProfilePage />} />
      <Route path="/CheckoutPage" element={<CheckoutPage />} />
      <Route path="/ShippingPage" element={<ShippingPage />} />
      <Route path="/PaymentPage" element={<PaymentPage />} />
      <Route path="/ReviewPage" element={<ReviewPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
