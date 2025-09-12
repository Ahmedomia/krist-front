export default function MyIcons() {
  return (
    <div className="flex items-start justify-start gap-30 mt-8 ml-32">
      <div className="flex flex-col items-start text-left">
        <span className="material-symbols-outlined text-3xl text-black">
          package_2
        </span>
        <p className="text-lg font-bold">Free Shipping</p>
        <p className="text-[12px]">Free shipping for order above 150$</p>
      </div>
      <div className="flex flex-col items-start text-left">
        <span className="material-symbols-outlined text-3xl text-black">
          paid
        </span>
        <p className="text-lg font-bold">Money Guarantee</p>
        <p className="text-[12px]">Within 30 days for an exchange</p>
      </div>
      <div className="flex flex-col items-start text-left">
        <span className="material-symbols-outlined text-3xl text-black">
          headphones
        </span>
        <p className="text-lg font-bold">Online Support</p>
        <p className="text-[12px]">24 hours a day, 7 days a week</p>
      </div>
      <div className="flex flex-col items-start text-left">
        <span className="material-symbols-outlined text-3xl text-black">
          credit_card
        </span>
        <p className="text-lg font-bold">Flexible Payment</p>
        <p className="text-[12px]">Pay with multiple credit cards</p>
      </div>
    </div>
  );
}
