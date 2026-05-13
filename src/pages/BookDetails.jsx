import { Navigate, useParams } from "react-router-dom";
import { books } from "../data/books";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const Navigate = useNavigate();
  const book = books.find(
    (b) => b.id === Number(id)
  );

  if (!book) return <div className="p-6">Book not found</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded mt-6 min-h-screen">
      <img
        src={book.cover}
        alt=""
        className="w-full h-full object-cover rounded"
      />

      <h2 className="text-2xl font-bold mt-4">
        {book.title}
      </h2>

      <p className="text-gray-500">{book.author}</p>

      <p className="mt-2">{book.description}</p>

      <p className="font-bold mt-3">
        ${book.price}
      </p>

      <button
        onClick={() => {
          addToCart(book);
          Navigate(`/cart`);
        }}
        className="bg-purple-600 text-white w-full py-2 rounded mt-4"
      >
        buy now
      </button>
    </div>
  );
}