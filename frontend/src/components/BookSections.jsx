import { Link } from "react-router-dom";
import { useBooks } from "../context/BookContext";
import BookCard from "./BookCard";

function BookSection({ title, description, books }) {
  if (!books.length) return (
    <p className="text-gray-400 text-center py-6">
      No books available in this section.
    </p>
  );

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black text-yellow-400">
            {title}
          </h2>

          <p className="text-gray-400 mt-2">
            {description}
          </p>
        </div>

        <Link
          to="/books"
          className="text-yellow-400 hover:text-yellow-300 font-bold"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard
            key={book._id || book.id}
            book={book}
          />
        ))}
      </div>
    </section>
  );
}

export default function BookSections() {
  const {
    justArrivedBooks,
    bestSellerBooks,
  } = useBooks();

  return (
    <section className="bg-transparent text-white px-4">
      <div className="max-w-7xl mx-auto py-14 border-t border-white/10">

        <BookSection
          title="Just Arrived"
          description="Fresh additions to our bookstore."
          books={justArrivedBooks}
        />

        <BookSection
          title="Trending"
          description="Our most popular books."
          books={bestSellerBooks}
        />

      </div>
    </section>
  );
}