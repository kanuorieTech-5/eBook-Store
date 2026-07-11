import { Link, useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef, useEffect } from "react";
import { useBooks } from "../context/BookContext";
import { getBookId } from "../utils/bookIds";

export default function FeaturedTitles() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const { books } = useBooks();

  const featuredBooks = books
    .filter((book) => book.featuredTitle)
    .slice(0, 12);

  const scroll = (direction) => {
   if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };
  useEffect(() => {
  const container = scrollRef.current;

  if (!container) return;

  const interval = setInterval(() => {
    if (
      container.scrollLeft +
        container.clientWidth >=
      container.scrollWidth - 10
    ) {
      container.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        left: 250,
        behavior: "smooth",
      });
    }
  }, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <section className="bg-transparent text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div className="text-cente">
            <h2 className="text-3xl font-black text-yellow-400 py-3">
              Trending Titles
            </h2>

            <p className="text-gray-400 mt-1">
              Discover trending ebooks readers love.
            </p>
          </div>

          <div className="hidden md:flex gap-3 mt-20">
            <button
              onClick={() => scroll("left")}
              className="
                bg-gray-900
                hover:bg-yellow-400
                hover:text-black
                transition
                p-3
                rounded-full
              "
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="
                bg-gray-900
                hover:bg-yellow-400
                hover:text-black
                transition
                p-3
                rounded-full
              "
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* BOOKS CAROUSEL */}
        <div
        ref={scrollRef}
        className="
            flex
            gap-6
            overflow-x-auto
            scrollbar-hide
            scroll-smooth
            pb-4
        "
        >
        {featuredBooks.map((book, index) => (
            <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
            }}
            viewport={{ once: true }}
            className="
                min-w-[220px]
                bg-gray-900
                rounded-3xl
                overflow-hidden
                border border-white/10
                hover:border-yellow-400/50
                transition-all
                group
            "
            >
            {/* COVER */}
            <div className="overflow-hidden relative">
                <img
                src={book.cover}
                alt={book.title}
                className="
                    w-full
                    h-[320px]
                    object-cover
                    group-hover:scale-105
                    transition duration-500
                "
                />

                <div
                className="
                    absolute
                    top-3
                    right-3
                    bg-yellow-400
                    text-black
                    p-2
                    rounded-full
                "
                >
                <Star size={16} />
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">
                <h3 className="font-bold text-lg line-clamp-1">
                {book.title}
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                {book.author}
                </p>

                <div className="flex items-center justify-between mt-5">
                <span className="text-yellow-400 font-black">
                    ${book.price.toFixed(2)}
                </span>

                <button 
                  onClick={() => navigate(`/books/${getBookId(book)}`)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-bold px-4 py-2 rounded-xl transition" 
                >
                  Buy Now
                </button>
                </div>
            </div>
            </motion.div>
        ))}
        </div>
            </div>
        </section>
        );
        }
