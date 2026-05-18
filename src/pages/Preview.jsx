import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { books } from "../data/books";
import PreviewModal from "../components/PreviewModal";

export default function PreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const book = books.find(
    (b) => b.id === Number(id)
  );

  const closeModal = () => {
    setIsOpen(false);

    // redirect back
    navigate("/books");
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Book not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">

      <PreviewModal
        isOpen={isOpen}
        closeModal={closeModal}
        book={book}
      />

    </div>
  );
}