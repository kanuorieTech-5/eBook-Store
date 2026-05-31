import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const navigate = useNavigate();

  const text =
    "Discover your next favorite book";

  const [displayText, setDisplayText] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [focus, setFocus] =
    useState(false);

  // =========================
  // TYPING EFFECT
  // =========================
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text.slice(0, i)
      );

      i++;

      if (i > text.length) {
        clearInterval(interval);
      }
    }, 60);

    return () =>
      clearInterval(interval);
  }, []);

  // =========================
  // SEARCH HANDLER
  // =========================
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/books?search=${encodeURIComponent(
        search
      )}`
    );
  };

  // =========================
  // ENTER KEY
  // =========================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <section
      className="
        relative
        w-full
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* BACKGROUND */}
      <div
        className="
          absolute inset-0
          bg-cover bg-center
          scale-110
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/7" />

      {/* GLOW */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-purple-900/20
          via-black/40
          to-black
        "
      />

      {/* FLOATING SHAPES */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          absolute
          top-20
          left-10
          w-24
          h-32
          bg-yellow-400
          rounded-xl
          opacity-20
          blur-sm
        "
      />

      <motion.div
        animate={{
          y: [0, 25, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-20
          right-10
          w-28
          h-36
          bg-purple-500
          rounded-xl
          opacity-20
          blur-md
        "
      />

      {/* CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          relative
          z-10
          text-center
          px-6
          max-w-5xl
        "
      >
        {/* BRAND */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="
            text-5xl
            md:text-7xl
            font-black
            text-yellow-400
            mb-4
          "
        >
          UketBooks
        </motion.h1>

        <p
          className="
            text-yellow-300
            mb-8
            text-lg
            md:text-2xl
            font-medium
          "
        >
          Your favorite digital bookstore.
        </p>

        {/* TYPING HEADLINE */}
        <h2
          className="
            text-3xl
            md:text-6xl
            font-black
            text-white
            leading-tight
            mb-8
            min-h-[100px]
          "
        >
          {displayText}

          <span
            className="
              animate-pulse
              text-yellow-400
            "
          >
            |
          </span>
        </h2>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-10">
          <div
            className={`
              flex
              items-center
              gap-2
              rounded-2xl
              p-2
              border
              transition-all duration-300
              ${
                focus
                  ? "border-yellow-400 shadow-yellow-400/20 shadow-2xl"
                  : "border-white/10"
              }
              bg-gray-900/90
              backdrop-blur-lg
            `}
          >
            <input
              type="text"
              placeholder="Search by title, author, category or ISBN"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onFocus={() =>
                setFocus(true)
              }
              onBlur={() =>
                setFocus(false)
              }
              onKeyDown={handleKeyDown}
              autoComplete="off"
              className="
                flex-1
                rounded-2xl
                border-none
                outline-none
                text-gray-500
                px-4
                py-4
                placeholder:text-gray-500
              "
            />

            <button
              type="submit"
              className="
                bg-yellow-400
                hover:bg-yellow-300
                text-black
                font-bold
                px-6
                py-4
                rounded-xl
                transition-all duration-300
                hover:scale-105
              "
            >
              Search
            </button>
          </div>
        </form>

        {/* CTA BUTTONS */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
            justify-center
          "
        >
          <Link
            to="/books"
            className="
              bg-purple-600
              hover:bg-yellow-400
              hover:text-black
              text-white
              px-8
              py-4
              rounded-2xl
              font-bold
              transition-all duration-300
              hover:scale-105
              shadow-xl
            "
          >
            Explore Books
          </Link>

          <Link
            to="/books"
            className="
              border
              border-white/20
              bg-white/10
              hover:bg-white/20
              text-white
              px-8
              py-4
              rounded-2xl
              font-semibold
              transition-all duration-300
              backdrop-blur-lg
            "
          >
            Download Books
          </Link>
        </div>

        {/* TRUST TEXT */}
        <p
          className="
            mt-10
            text-sm
            text-gray-400
          "
        >
          Trusted by readers worldwide •
          Secure payments • Instant
          downloads
        </p>
      </motion.div>
    </section>
  );
}