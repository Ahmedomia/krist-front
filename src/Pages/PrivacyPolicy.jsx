import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          At Krist, we value your privacy. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Information We Collect
        </h2>
        <p>
          We may collect personal details such as your name, email, address, and
          payment information when you interact with our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          How We Use Your Data
        </h2>
        <p>
          Your information is used to process orders, improve our services, and
          communicate important updates.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p>
          If you have questions about our Privacy Policy, contact us at{" "}
          <a href="mailto:ahmed.omaia12@gmail.com" className="text-blue-600">
            ahmed.omaia12@gmail.com
          </a>
          .
        </p>
      </div>
      <Footer />
    </>
  );
}
