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
import AdminDashboard from "./Pages/AdminDashboard";
import AdminRoute from "./Components/AdminRoute";
import AdminLayout from "./Pages/AdminLayout";
import AdminUsers from "./Pages/AdminUsers";
import AdminProducts from "./Pages/AdminProducts";
import AdminOrders from "./Pages/AdminOrders";
import AdminProductForm from "./Pages/AdminProductForm";
import CheckoutPage from "./Pages/CheckoutPage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import ReviewPage from "./Pages/ReviewPage";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";
import ContactUs from "./Pages/ContactUs";
import OurStory from "./Pages/OurStory";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/login" element={<LoginPage />} />
      <Route path="/users/signup" element={<SignupPage />} />
      <Route path="/users/forgot-password" element={<ForgotPassword />} />
      <Route path="/OTP" element={<OTPPage />} />
      <Route path="/users/update-password" element={<NewPassword />} />
      <Route path="/ShopPage" element={<ShopPage />} />
      <Route path="/ProfilePage" element={<ProfilePage />} />
      <Route path="/CheckoutPage" element={<CheckoutPage />} />
      <Route path="/ShippingPage" element={<ShippingPage />} />
      <Route path="/PaymentPage" element={<PaymentPage />} />
      <Route path="/ReviewPage" element={<ReviewPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsConditions />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/OurStory" element={<OurStory />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
