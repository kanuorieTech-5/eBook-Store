import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaStar } from "react-icons/fa";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeaturedBooks() {

  const { addToCart } = useContext(CartContext);

  const books = [
    {
      id: 1,
      cover:
        "https://images-na.ssl-images-amazon.com/images/I/51-nXsSRfZL._SX329_BO1,204,203,200_.jpg",
      title: "Atomic Habits",
      author: "James Clear",
      price: "₦5,000",
    },
    {
      id: 2,
      cover:
        "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: "₦6,500",
    },
    {
      id: 3,
      cover:
        "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: "₦4,800",
    },
    {
      id: 4,
      cover:
        "https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg",
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      price: "₦4,200",
    },
  ];

  return (
    <section className="bg-black border-t border-white/10 py-20 px-6 md:px-12">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">

        <h2 className="text-3xl md:text-4xl font-bold text-white">
          ⭐ Featured Books
        </h2>

        <p className="text-gray-400 mt-2">
          Swipe through top picks curated for you
        </p>

      </div>

      {/* Slider */}
      <div className="max-w-6xl mx-auto">

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

          {books.map((book) => (

            <SwiperSlide key={book.id}>

              <div className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden group hover:-translate-y-2 transition">

                {/* Image */}
                <div className="relative overflow-hidden">

                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-72 object-cover group-hover:scale-105 transition"
                  />

                  {/* Price badge */}
                  <span className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
                    {book.price}
                  </span>

                </div>

                {/* Content */}
                <div className="p-5">

                  <h3 className="text-white font-bold text-lg">
                    {book.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-2">
                    {book.author}
                  </p>

                  {/* Fake rating */}
                  <div className="flex items-center gap-1 text-yellow-400 mb-3">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">

                    <button
                      onClick={() => addToCart(book)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl transition"
                    >
                      Add to Cart
                    </button>

                    <button className="flex-1 border border-white/10 text-white py-2 rounded-xl hover:bg-white/10 transition">
                      Preview
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