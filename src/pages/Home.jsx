import Hero from "../components/Hero";
import FeaturedBooks from "../components/FeaturedBooks";
import Categories from "../components/CategoryFilter";


export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedBooks />
      <Categories />
    </div>
  );
}