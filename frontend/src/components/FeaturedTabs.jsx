import { useState, useRef, useEffect  } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

export default function FeaturedTabs() {
  const [activeTab, setActiveTab] =
    useState("featured");

  const scrollRef = useRef(null);

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

  const featuredBooks = [
    {
      id: 1,
      title: "Between Two Fires",
      author: "Christopher Buehlman",
      category: "Historical Fiction",
      image:
        "https://image.ebooks.com/cover/346929868.jpg?width=220&height=340&quality=85",
      price: "Free",
    },
    {
      id: 2,
      title: "Moonwalk",
      author: "Michael Jackson",
      category: "Biography",
      image:
        "https://image.ebooks.com/cover/569452.jpg?width=220&height=340&quality=85",
      price: "Free",
    },
    {
      id: 3,
      title: "The Names",
      author: "Florence Knapp",
      category: "Mystery",
      image:
        "https://image.ebooks.com/cover/211122768.jpg?width=220&height=340&quality=85",
      price: "$12.99",
    },
    {
      id: 4,
      title: "The Deal",
      author: "Elle Kennedy",
      category: "Romance",
      image:
        "https://image.ebooks.com/cover/211074533.jpg?width=220&height=340&quality=85",
      price: "$13.99",
    },
    {
      id: 5,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      category: "Finance",
      image:
        "https://image.ebooks.com/cover/210119242.jpg?width=220&height=340&quality=85",
      price: "$15.99",
    },
    {
      id: 6,
      title: "Wisdom Untethered",
      author: "Michael A. Singer",
      category: "Self-Help",
      image:
        "https://image.ebooks.com/cover/347208758.jpg?width=220&height=340&quality=85",
      price: "$14.15",
    },
  ];

  const justArrivedBooks = [
    {
      id: 7,
      title: "Fury Bound",
      author: "Sable Sorensen",
      category: "Fantasy",
      image:
        "https://image.ebooks.com/cover/346575631.jpg?width=220&height=340&quality=85",
      price: "Free",
    },
    {
      id: 8,
      title: "King of Gluttony",
      author: "Ana Huang",
      category: "Contemporary Fiction",
      image:
        "https://image.ebooks.com/cover/346427560.jpg?width=220&height=340&quality=85",
      price: "$13.99",
    },
    {
      id: 9,
      title: "Yesteryear",
      author: "Caro Claire Burke",
      category: "Historical Fiction",
      image:
        "https://image.ebooks.com/cover/346730675.jpg?width=220&height=340&quality=85",
      price: "Free",
    },
    {
      id: 10,
      title: "Rewired",
      author: "Eric Lamarre",
      category: "Science Fiction",
      image:
        "https://image.ebooks.com/cover/347429375.jpg?width=220&height=340&quality=85",
      price: "$39.50",
    },
    {
      id: 11,
      title: "Paradox",
      author: "Douglas Preston",
      category: "Mystery",
      image:
        "https://image.ebooks.com/cover/347335442.jpg?width=220&height=340&quality=85",
      price: "$8.99",
    },
    {
      id: 12,
      title: "Agentic Coding with Claude",
      author: "Eden Marco",
      category: "Technology",
      image:
        "https://image.ebooks.com/cover/347322347.jpg?width=220&height=340&quality=85",
      price: "$43.99",
    },
  ];

  const books =
    activeTab === "featured"
      ? featuredBooks
      : justArrivedBooks;

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left:
          direction === "left"
            ? -400
            : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-yellow-400"
          >
            Discover Amazing Books
          </motion.h2>

          <p className="text-gray-400 mt-3 text-lg">
            Explore featured books and the latest arrivals.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() =>
              setActiveTab(
                "featured"
              )
            }
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab ===
              "featured"
                ? "bg-yellow-400 text-black"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Trending Now
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "arrived"
              )
            }
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab ===
              "arrived"
                ? "bg-yellow-400 text-black"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            New Releases
          </button>
        </div>

        {/* CONTROLS */}
        <div className="hidden md:flex gap-3 justify-end mb-8">
          <button
            onClick={() =>
              scroll("left")
            }
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
            onClick={() =>
              scroll("right")
            }
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

        {/* CAROUSEL */}
        <div
          ref={scrollRef}
          className="
            flex
            flex-nowrap
            gap-6
            overflow-x-auto
            scrollbar-hide
            scroll-smooth
            pb-4
          "
        >
          {books.map(
            (book, index) => (
              <motion.div
                key={book.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay:
                    index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
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
                    src={book.image}
                    alt={book.title}
                    className="
                      w-full
                      h-[320px]
                      object-cover
                      group-hover:scale-105
                      transition
                      duration-500
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
                    <Star
                      size={16}
                    />
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
                      {book.price}
                    </span>

                    <Link
                      to="/books"
                      className="
                        bg-yellow-400
                        hover:bg-yellow-300
                        text-black
                        text-sm
                        font-bold
                        px-4
                        py-2
                        rounded-xl
                        transition
                      "
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>

      </div>
    </section>
  );
}