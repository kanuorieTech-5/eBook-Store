import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const justArrivedBooks = [
  {
    id: 1,
    title: "Fury Bound",
    author: "Sable Sorensen",
    category: "Fantasy",
    price: "$12.99",
    image:
      "https://image.ebooks.com/cover/346575631.jpg?width=194&height=300&quality=85",
  },
  {
    id: 2,
    title: "King of Gluttony",
    author: "Ana Huang",
    category: "Romance",
    price: "$13.99",
    image:
      "https://image.ebooks.com/cover/346427560.jpg?width=194&height=300&quality=85",
  },
  {
    id: 3,
    title: "Yesteryear",
    author: "Caro Claire Burke",
    category: "Historical Fiction",
    price: "$11.99",
    image:
      "https://image.ebooks.com/cover/346730675.jpg?width=194&height=300&quality=85",
  },
    {
    id: 4,
    title: "The Deal",
    author: "Elle Kennedy",
    category: "Romance",
    price: "$12.99",
    image:
      "https://image.ebooks.com/cover/346730676.jpg?width=194&height=300&quality=85",
  }
];

const bestSellerBooks = [
  {
    id: 1,
    title: "Platform Decay",
    author: "Martha Wells",
    category: "Science Fiction",
    price: "$17.49",
    image:
      "https://image.ebooks.com/cover/346946966.jpg?width=194&height=300&quality=85",
  },
  {
    id: 2,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Technology",
    price: "$59.99",
    image:
      "https://image.ebooks.com/cover/347309662.jpg?width=194&height=300&quality=85",
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Science Fiction",
    price: "$15.99",
    image:
      "https://image.ebooks.com/cover/210098536.jpg?width=194&height=300&quality=85",
  },
{
    id: 4,
    title: "The Names",
    author: "Liu Cixin",
    category: "Science Fiction",
    price: "$14.99",
    image:
      "https://image.ebooks.com/cover/347085632.jpg?width=194&height=300&quality=85",
  }
];

function BookCard({ book, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      viewport={{ once: true }}
      className="
        bg-gray-900
        rounded-3xl
        overflow-hidden
        border border-white/10
        hover:border-yellow-400/50
        transition-all
        group
      "
    >
      <div className="overflow-hidden">
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
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-white line-clamp-1">
          {book.title}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          {book.author}
        </p>

        <p className="text-gray-500 text-xs mt-1">
          {book.category}
        </p>

        <div className="flex items-center justify-between mt-2 gap-2">
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
            Buy
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function BookSection({ title, books }) {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black text-yellow-400">
            {title}
          </h2>

          <p className="text-gray-400 mt-2">
            Explore our latest additions.
          </p>
        </div>

        <Link
          to="/books"
          className="
            text-yellow-400
            hover:text-yellow-300
            font-bold
          "
        >
          View All →
        </Link>
      </div>

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-6
        "
      >
        {books.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default function BookSections() {
  return (
    <section className="bg-transparent text-white px-4">
      <div className="max-w-7xl mx-auto py-14 border-t border-white/10">

        <BookSection
          title="Just Arrived"
          books={justArrivedBooks}
        />

        <BookSection
          title="Bestsellers"
          books={bestSellerBooks}
        />

      </div>
    </section>
  );
}