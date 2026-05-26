import { useParams, useNavigate } from "react-router-dom";
import { useBooks, } from "../context/BookContext";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { books } = useBooks();
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return <div className="p-6">Book not found</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded mt-6 min-h-screen">

      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-80 object-cover rounded"
      />

      <h2 className="text-2xl font-bold mt-4 text-gray-800">{book.title}</h2>

      <p className="text-gray-500 text-lg">{book.author}</p>

      <p className="mt-2 text-gray-600">{book.description}</p>

      <p className="font-bold mt-3 text-lg text-yellow-600">₦{book.price}</p>
      <button
        onClick={() => {
          navigate(`/preview/${book.id}`);
        }}
        className="bg-purple-600 text-white w-full py-2 rounded mt-4"
      >
        Read preview
      </button>



      <button
        onClick={() => {
          addToCart(book);
          navigate("/cart");
        }}
        className="bg-purple-600 text-white w-full py-2 rounded mt-4"
      >
        Download Now
      </button>
    </div>
  );
}
