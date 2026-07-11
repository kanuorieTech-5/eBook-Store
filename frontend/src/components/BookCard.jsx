import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { getBookId } from "../utils/bookIds";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const bookId = getBookId(book);

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const handleView = () => {
    navigate(`/Books/${bookId}`);
  };

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <div className="bg-gray-900 rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group"
    >
      {/* Cover */}
      <div className="relative overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x450?text=No+Cover";
          }}
          className="
            w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {book.category && (
          <span
            className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full"
          >
            {book.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-1">
        <h3 className=" font-bold text-white line-clamp-1">
          {book.title}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          {book.author}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-yellow-400 font-black">
            {formatPrice(book.price)}
          </span>

          {book.sales > 50 && (
            <span className="text-xs text-green-400">
              Best Seller
            </span>
          )}
        </div>

        <div className="flex gap-1 mt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 font-semibold py-1 px-1 rounded-xl transition"
          >
            +🛒
          </button>

          <button
            onClick={handleView}
            className="px-1 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-xl transition"
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
}