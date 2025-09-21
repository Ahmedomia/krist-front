import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function TermsConditions() {
  return (
    <>
      <Header />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="mb-4">
          By using Krist’s website and services, you agree to the following
          terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Use of Services</h2>
        <p>
          You agree to use our services only for lawful purposes and in
          accordance with our policies.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Orders & Payments</h2>
        <p>
          All orders are subject to acceptance and availability. Payment must be
          completed before order processing.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Limitation of Liability
        </h2>
        <p>
          We are not liable for indirect or consequential damages arising from
          the use of our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Changes</h2>
        <p>
          We may update these terms at any time. Continued use of our services
          means you accept the updated terms.
        </p>
      </div>
      <Footer />
    </>
  );
}
