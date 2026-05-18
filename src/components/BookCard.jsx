import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function BookCard({ book }) {

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition duration-300 group">

      {/* Book Cover */}
      <div className="overflow-hidden relative">

        <img
          src={book.cover}
          alt={book.title}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400?text=No+Cover";
          }}
          className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
          {book.category}
        </span>

      </div>

      {/* Content */}
      <div className="p-4">

        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
          {book.title}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {book.author}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
          ⭐⭐⭐⭐⭐
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">

          <p className="text-purple-700 font-bold text-lg">
            ${book.price}
          </p>

          <span className="text-gray-400 line-through text-sm">
            ${(book.price + 5).toFixed(2)}
          </span>

        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-5">

          <button
            onClick={() => addToCart(book)}
            className="flex-1 bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={() => navigate(`/books/${book.id}`)}
            className="border border-purple-600 text-purple-600 px-4 rounded-xl hover:bg-purple-600 hover:text-white transition"
          >
            View
          </button>

        </div>

        {/* Preview Link */}
        <Link
          to={`/preview/${book.id}`}
          className="block text-center text-sm text-purple-600 mt-3 hover:underline"
        >
          Quick Preview
        </Link>

      </div>
    </div>
  );
}