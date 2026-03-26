import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <div className="bg-white shadow-lg rounded-xl p-10 text-center">

        <div className="text-green-500 text-6xl mb-4">
          ✔
        </div>

        <h1 className="text-3xl font-bold mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Your books are now available in your library.
        </p>

        <Link
          to="/MyLibrary"
          className="bg-purple-600 text-white px-6 py-3 rounded"
        >
          Go to My Library
        </Link>

      </div>

    </div>
  );
}