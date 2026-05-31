import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef, useEffect } from "react";


const featuredBooks = [
  {
    id: 1,
    title: "Between Two Fires",
    author: "Christopher Buehlman",
    price: "$12.99",
    cover:
      "https://image.ebooks.com/cover/346929868.jpg?width=220&height=340&quality=85",
  },

  {
    id: 2,
    title: "Moonwalk",
    author: "Michael Jackson",
    price: "$11.99",
    cover:
      "https://image.ebooks.com/cover/569452.jpg?width=220&height=340&quality=85",
  },

  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: "$14.99",
    cover:
      "https://image.ebooks.com/cover/210119242.jpg?width=220&height=340&quality=85",
  },

  {
    id: 4,
    title: "The Deal",
    author: "Elle Kennedy",
    price: "$13.00",
    cover:
      "https://image.ebooks.com/cover/211074533.jpg?width=220&height=340&quality=85",
  },

  {
    id: 5,
    title: "Wisdom Untethered",
    author: "Michael A. Singer",
    price: "$15.00",
    cover:
      "https://image.ebooks.com/cover/347208758.jpg?width=220&height=340&quality=85",
  },

  {
    id: 6,
    title: "Life Hacks for ChatGPT",
    author: "Stanley Lieber",
    price: "$10.00",
    cover:
      "https://image.ebooks.com/cover/346870071.jpg?width=220&height=340&quality=85",
  },
];

export default function FeaturedTitles() {
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

  return (
    <section className="bg-transparent text-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-yellow-400">
              Bestsellers
            </h2>

            <p className="text-gray-400 mt-2">
              Discover trending ebooks readers love.
            </p>
          </div>

          <div className="hidden md:flex gap-3">
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
            key={index}
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
                    {book.price}
                </span>

                <button 
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
                    Buy
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
