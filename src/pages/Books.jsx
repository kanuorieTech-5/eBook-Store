import { useState, useContext } from "react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { CartContext } from "../context/CartContext";
import FeaturedBooks from "../components/FeaturedBooks";

export default function Books() {

  const { addToCart } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredBooks = books.filter((book) => {

    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-1 max-w-6xl mx-auto bg-black rounded-2xl shadow-lg">
      <div className="mb-6">
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="UketBooks" 
          className="w-full h-40 object-cover rounded mb-3" 
          />
      </div>
      <div>
        < FeaturedBooks />
      </div>
      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />
    <SearchBar search={search} setSearch={setSearch} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredBooks.map((book) => (

          <BookCard
            key={book.id}
            book={book}
            image={book.cover}
            title={book.title}
            author={book.author}
            price={book.price}
            addToCart={addToCart}
          />

        ))}

      </div>

    </div>
  );
}