import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {

  const text = "Discover your next favorite book";
  const [displayText, setDisplayText] = useState("");

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Floating book animation */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 w-24 h-32 bg-yellow-400 rounded-xl opacity-30 blur-sm"
      />

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-28 h-36 bg-purple-500 rounded-xl opacity-20 blur-md"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >

        {/* Brand */}
        <h1 className="text-5xl md:text-6xl font-black text-yellow-400 mb-3">
          UketBooks
        </h1>

        <p className="text-yellow-300 mb-6 text-2xl md:text-xl">
          Your favorite bookstore.
        </p>

        {/* Animated headline */}
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 min-h-[80px]">
          {displayText}
          <span className="animate-pulse text-yellow-400">|</span>
        </h2>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">

          <input
            type="text"
            placeholder="Search books, authors, topics..."
            className="w-full sm:w-[400px] px-5 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/10 focus:border-yellow-400"
          />

          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-bold transition">
            Search
          </button>

        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/books"
            className="bg-purple-500 hover:bg-yellow-300 text-white px-8 py-4 rounded-2xl font-bold transition"
          >
            Explore Books
          </Link>

          <Link
            to="/books"
            className="border border-white/30 bg-purple-500 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold transition"
          >
            Download books
          </Link>

        </div>

        {/* Trust line */}
        <p className="mt-10 text-sm text-gray-300">
          Trusted by readers worldwide • Secure payments • Instant downloads.
        </p>

      </motion.div>

    </section>
  );
}