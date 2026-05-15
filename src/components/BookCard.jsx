import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import PreviewModal from "./previewModal";
export default function BookCard({ book, cart, addToCart }) {

  const navigate = useNavigate();
  const { addToCart: cartContextAddToCart } = useContext(CartContext);

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">

      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-60 object-cover rounded mb-3 transition-transform duration-300 hover:scale-105"
      />
      <Link
        to={`/previewmodal/${book.id}`}
        className="bg-yellow-400 text-black px-3 py-1 rounded text-sm font-bold hover:bg-yellow-300 transition"
      >
        Preview
      </Link>

      <h3 className="font-bold text-lg text-white">{book.title}</h3>
      <p className="text-gray-300 text-sm ">{book.author}</p>
      <p className="text-purple-600 font-bold mt-2">${book.price}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => navigate(`/books/${book.id}`)}
          className="text-purple-600 text-sm font-bold px-3 py-1 rounded border border-purple-600 hover:bg-purple-600 hover:text-white transition"
        >
          View Details
        </button>

        <button
          onClick={() => cartContextAddToCart(book)}
          className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
        >
          Add to Cart
        </button>
        
      
      </div>
    </div>
  );
}