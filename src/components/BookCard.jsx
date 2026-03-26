import { useNavigate } from "react-router-dom";

export default function BookCard({ book, addToCart }) {

  const navigate = useNavigate();

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">

      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-60 object-cover rounded mb-3"
      />

      <h3 className="font-bold">{book.title}</h3>
      <p className="text-gray-500 text-sm">{book.author}</p>
      <p className="text-purple-600 font-bold mt-2">${book.price}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => navigate(`/books/${book.id}`)}
          className="text-purple-600 text-sm font-bold px-3 py-1 rounded border border-purple-600 hover:bg-purple-600 hover:text-white transition"
        >
          View Details
        </button>

        <button
          onClick={() => addToCart(book)}
          className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
        >
          Add to Cart
        </button>
      
      </div>
    </div>
  );
}