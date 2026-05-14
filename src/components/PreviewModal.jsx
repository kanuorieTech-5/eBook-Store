import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function PreviewModal({ isOpen, closeModal, book }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (book) {
      setLoading(true);
    }
  }, [book]);

  if (!book) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="bg-gray-900 text-white max-w-4xl mx-auto mt-10 rounded-3xl overflow-hidden shadow-2xl outline-none"
      overlayClassName="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      ariaHideApp={false}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-yellow-400">
          {book.title}
        </h2>

        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-white transition text-xl"
        >
          <FaTimes />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">

        {/* Cover */}
        <div className="flex justify-center">
          <img
            src={book.cover}
            alt={book.title}
            className="w-60 h-80 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed text-center">
          {book.description}
        </p>

        {/* Preview Loader */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading preview...
          </p>
        )}

        {/* Preview */}
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <iframe
            src={book.preview}
            width="100%"
            height="450px"
            className="bg-black"
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          
          <button
            onClick={closeModal}
            className="px-8 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition"
          >
            Close Preview
          </button>

          <button className="px-8 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold transition">
            Buy This Book
          </button>

        </div>
      </div>
    </Modal>
  );
}