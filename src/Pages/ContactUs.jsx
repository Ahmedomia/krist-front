import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function ContactUs() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <a
            href="tel:+15551234567"
            className="p-6 shadow-sm text-center block rounded-lg hover:shadow-md hover:bg-gray-50 transition"
          >
            <div className="text-4xl mb-4">📞</div>
            <h2 className="text-xl font-semibold mb-2">Phone</h2>
            <p>+20 1040455096</p>
            <p className="text-gray-500 text-sm mt-2">Mon–Fri, 9AM to 6PM</p>
          </a>
          <a
            href="mailto:Ahmed.omaia12@gmail.com"
            className="p-6 shadow-sm text-center block rounded-lg hover:shadow-md hover:bg-gray-50 transition"
          >
            <div className="text-4xl mb-4">✉️</div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p>Ahmed.omaia12@gmail.com</p>
            <p className="text-gray-500 text-sm mt-2">
              We’ll respond within 24h
            </p>
          </a>
          <a
            href="https://maps.google.com/?q=123+Fashion+Street+New+York,+NY+10001"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 shadow-sm text-center block rounded-lg hover:shadow-md hover:bg-gray-50 transition"
          >
            <div className="text-4xl mb-4">📍</div>
            <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
            <p>123 Fashion Street</p>
            <p>New York, NY 10001</p>
            <p className="text-gray-500 text-sm mt-2">Our flagship boutique</p>
          </a>
          <div className="p-6 shadow-sm text-center rounded-lg">
            <div className="text-4xl mb-4">⏰</div>
            <h2 className="text-xl font-semibold mb-2">Store Hours</h2>
            <p>Mon–Fri: 10AM–8PM</p>
            <p>Sat–Sun: 10AM–6PM</p>
            <p className="text-gray-500 text-sm mt-2">
              Extended hours during holidays
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
