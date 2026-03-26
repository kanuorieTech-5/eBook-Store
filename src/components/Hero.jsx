import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-purple-700 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-5xl font-bold mb-6">
           Discover Your Next Favorite Book 📚
        </h1>

        <p className="text-lg text-purple-100 mb-8">
          Thousands of books from top authors across every genre.
        </p>

        <Link
          to="/books"
          className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
         Get Started Here 
        </Link>
        <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Library" className="mx-auto mt-10 w-full max-w-md rounded-lg shadow" />
      </div>
    </section>
  );
}