import FeaturedBooks from "../components/FeaturedBooks";
// import Categories from "../components/CategoryFilter";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Categories from "../components/categories";
import FeatureCarousel from "../components/FeatureCarousel";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
// import books  from "../data/books";

export default function Home() {
  return (
    <div className="bg-gray-950 min-h-screen">
      {/* <Navbar /> */}
      <Hero />

      {/* <SearchBar /> */}

      <Categories />

      {/* <BookCard /> */}

      {/* <books /> */}

      {/* Featured Books */}
      <FeatureCarousel />

      {/* <Footer /> */}
    </div>
  );
}
