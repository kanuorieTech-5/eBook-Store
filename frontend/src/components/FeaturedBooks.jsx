import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useBooks } from "../context/BookContext";
import { FaStar } from "react-icons/fa";
import { getBookId } from "../utils/bookIds";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeaturedBooks() {
  const { addToCart } = useContext(CartContext);
  const { books } = useBooks();
  const navigate = useNavigate();

  const featuredBooks = useMemo(() => {
    return books
        .filter(book => book.featured)
        .slice(0, 12);
  }, [books]);
    
  if (!featuredBooks.length) {
  return (
    <section className="py-10 text-center border border-white/10 bg-gray-900 rounded-2xl max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-white">
        Top Pick Books
      </h2>

      <p className="text-gray-400 mt-4">
        No featured books available yet.
      </p>
    </section>
  );
}

  return (
    <section className="bg-black border-t border-white/10 py-5 px-2 md:px-2">

      {/* Header */}
      <div className="mb-2">

        <h2 className="text-2xl md:text-4xl font-bold text-white">
          ⭐Books You Can't Miss
        </h2>

        <p className="text-gray-400 mt-2">
          Swipe through top picks curated for you
        </p>
      </div>
      {/* Slider */}
      <div>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {featuredBooks.map((book) => (

            <SwiperSlide key={book._id}>

              <div className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden group hover:-translate-y-2 transition">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-72 object-cover group-hover:scale-105 transition"
                    loading="lazy"
                  />

                  {/* Price badge */}
                  <span className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
                    ${Number(book.price).toFixed(2)}
                  </span>

                </div>

                {/* Content */}
                <div className="p-5">

                  <h3 className="text-white font-bold text-sm">
                    {book.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-2">
                    {book.author}
                  </p>
                  <p className="text-xs text-yellow-400 mb-2">
                    {book.category}
                  </p>
                  {/* Fake rating */}
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">

                    <button
                      onClick={() => addToCart(book)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl transition"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => navigate(`/books/${getBookId(book)}`)}
                      className="flex-1 border border-white/10 text-white py-2 rounded-xl hover:bg-white/10 transition"
                    >
                      View Details
                    </button>

                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
}
