import { useState, useContext } from "react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { CartContext } from "../context/CartContext";

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
    <div className="p-6 max-w-6xl mx-auto">

      <SearchBar search={search} setSearch={setSearch} />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredBooks.map((book) => (

          <BookCard
            key={book.id}
            book={book}
            addToCart={addToCart}
          />

        ))}

      </div>

    </div>
  );
}