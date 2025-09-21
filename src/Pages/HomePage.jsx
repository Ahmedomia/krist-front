import Carousel from "../Components/Carousel";
import BestSeller from "../Components/BestSeller";
import Categories from "../Components/Categories";
import Deals from "../Components/Deals";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ReviewsCards from "../Components/ReviewsCards";
import MyIcons from "../Components/Icons";
export default function HomePage() {
  return (
    <>
      <Header />
      <Carousel />
      <Categories />
      <BestSeller />
      <Deals />
      <ReviewsCards />
      <MyIcons />
      <Footer />
    </>
  );
}
