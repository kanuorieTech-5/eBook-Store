import { FaStar } from "react-icons/fa";

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: "₦5,000",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: "₦6,500",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    price: "₦4,500",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FeatureCarousel() {
  return (
    <section className="px-6 md:px-12 py-24 bg-gray-950">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
        
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
            Featured Books
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl">
            Discover premium ebooks curated for learning,
            growth, business, and personal development.
          </p>
        </div>

        <button className="text-yellow-400 hover:text-yellow-300 transition font-semibold">
          View All Books
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {books.map((book, index) => (
          <div
            key={index}
            className="group bg-gray-900 border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-3 transition-all duration-300 shadow-xl hover:shadow-yellow-400/10"
          >
            
            {/* Image */}
            <div className="relative overflow-hidden">
              
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-[420px] object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Price Badge */}
              <div className="absolute top-5 right-5 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {book.price}
              </div>

            </div>

            {/* Content */}
            <div className="p-7">
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <span className="text-gray-400 text-sm">
                  ({book.rating})
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-white mb-2 line-clamp-1">
                {book.title}
              </h3>

              {/* Author */}
              <p className="text-gray-400 mb-7">
                by {book.author}
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
                
                <button className="flex-1 bg-yellow-400 hover:bg-yellow-300 transition text-black py-3 rounded-2xl font-bold">
                  Preview
                </button>

                <button className="flex-1 border border-white/10 hover:bg-white/5 transition text-white py-3 rounded-2xl font-semibold">
                  Buy Now
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}