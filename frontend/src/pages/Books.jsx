import { useState, useContext, useEffect, useMemo } from "react";
import { useBooks }from "../context/BookContext";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { CartContext } from "../context/CartContext";
import {
  getBookId,
  isSameBook,
} from "../utils/bookIds";

export default function Books() {
  const { addToCart } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [wishlist, setWishlist] = useState([]);
  const { books } = useBooks();
  // 🔥 Smart search + filter system
  const filteredBooks = useMemo(() => {
    const q = search.toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q);

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  // 📦 Infinite scroll load more
  const visibleBooks = filteredBooks.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  // ❤️ Wishlist toggle
  const toggleWishlist = (book) => {
    const bookId =
      getBookId(book);

    setWishlist((prev) =>
      prev.find((b) =>
        isSameBook(b, bookId)
      )
        ? prev.filter(
            (b) =>
              !isSameBook(b, bookId)
          )
        : [...prev, book]
    );
  };

  // 🔄 Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(8);
  }, [search, category]);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO BANNER */}
      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80"
          alt="ebook banner"
          className="w-full h-48 md:h-64 object-cover"
        />
      </div>

      {/* SEARCH */}
      <SearchBar search={search} setSearch={setSearch} books={books} />

      {/* CATEGORY FILTER */}
      <CategoryFilter category={category} setCategory={setCategory} />

      {/* RESULTS INFO */}
      <div className="px-4 md:px-8 text-gray-400 text-sm mb-4">
        Showing {visibleBooks.length} of {filteredBooks.length} books
      </div>

      {/* BOOK GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-8 pb-10">

        {visibleBooks.length > 0 ? (
          visibleBooks.map((book) => (
            <BookCard
              key={getBookId(book)}
              book={book}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No books found 😢
          </p>
        )}

      </div>

      {/* LOAD MORE BUTTON */}
      {visibleCount < filteredBooks.length && (
        <div className="text-center pb-10">
          <button
            onClick={loadMore}
            className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-xl font-semibold"
          >
            Load More Books
          </button>
        </div>
      )}

    </div>
  );
}
