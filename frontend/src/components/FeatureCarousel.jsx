import { FaStar } from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useContext,
} from "react";

import { CartContext } from "../context/CartContext";
import {
  useBooks,
} from "../context/BookContext";
import {
  getBookId,
} from "../utils/bookIds";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const fallbackBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 5000,
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 6500,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    price: 4500,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 7000,
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FeatureCarousel() {

  const { addToCart } =
    useContext(CartContext);
  const { books } = useBooks();

  const navigate =
    useNavigate();

  const highlightedBooks =
    books.filter(
      (book) =>
        book.featured ||
        book.bestseller
    );

  const carouselBooks =
    (
      highlightedBooks.length
        ? highlightedBooks
        : books
    ).slice(0, 6);

  const displayBooks =
    carouselBooks.length
      ? carouselBooks
      : fallbackBooks;

  return (
    <section
      className="
        bg-black
        border-t border-white/10
        py-24
        px-6
        md:px-12
        overflow-hidden
      "
    >

      {/* HEADER */}
      <div
        className="
          max-w-7xl
          mx-auto
          flex
          flex-col
          md:flex-row
          md:items-end
          md:justify-between
          gap-6
          mb-14
        "
      >

        <div>

          <p
            className="
              text-yellow-400
              uppercase
              tracking-[0.2em]
              text-sm
              mb-4
            "
          >
            Premium Collection
          </p>

          <h2
            className="
              text-4xl
              md:text-6xl
              font-black
              text-white
              leading-tight
            "
          >
            Featured
            <span className="text-yellow-400">
              {" "}Ebooks
            </span>
          </h2>

          <p
            className="
              text-gray-400
              text-lg
              mt-5
              max-w-2xl
            "
          >
            Curated digital books designed for
            growth, business, productivity,
            and personal transformation.
          </p>

        </div>

        <Link
          to="/books"
          className="
            text-white
            border border-white/10
            hover:border-yellow-400/40
            hover:bg-white/5
            transition
            px-6 py-3
            rounded-2xl
            font-semibold
            backdrop-blur-xl
          "
        >
          Browse Library
        </Link>

      </div>

      {/* SLIDER */}
      <div className="max-w-7xl mx-auto">
        <Swiper
          className="featured-swiper"
          modules={[
            Autoplay,
            Pagination,
            Navigation,
          ]}
          spaceBetween={30}
          loop={true}

          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}

          navigation={true}

          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}

          grabCursor={true}

          breakpoints={{
            0: {
              slidesPerView: 1,
            },

            768: {
              slidesPerView: 2,
            },

            1200: {
              slidesPerView: 3,
            },
          }}
        >

          {displayBooks.map((book) => (
            <SwiperSlide key={getBookId(book)}>

              <div
                className="
                  group
                  bg-gradient-to-b
                  from-gray-900
                  to-black
                  border border-white/10
                  rounded-[32px]
                  overflow-hidden
                  transition-all
                  duration-500
                  hover:-translate-y-3
                  hover:border-yellow-400/30
                  hover:shadow-2xl
                  hover:shadow-yellow-400/10
                "
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden">

                  <img
                    src={book.cover || book.image}
                    alt={book.title}
                    className="
                      w-full
                      h-[420px]
                      object-cover
                      group-hover:scale-110
                      transition-transform
                      duration-700
                    "
                  />

                  {/* OVERLAY */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/70
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* PRICE */}
                  <div
                    className="
                      absolute
                      top-5
                      right-5
                      bg-yellow-400
                      text-black
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-black
                      shadow-lg
                    "
                  >
                    NGN {Number(book.price).toLocaleString()}
                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-7">

                  {/* RATING */}
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mb-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-1
                        text-yellow-400
                      "
                    >
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>

                    <span
                      className="
                        text-gray-500
                        text-sm
                      "
                    >
                      ({book.rating})
                    </span>

                  </div>

                  {/* TITLE */}
                  <h3
                    className="
                      text-2xl
                      font-black
                      text-white
                      mb-2
                    "
                  >
                    {book.title}
                  </h3>

                  {/* AUTHOR */}
                  <p
                    className="
                      text-gray-400
                      mb-8
                    "
                  >
                    by {book.author}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-4">

                    <Link
                      to={`/preview/${getBookId(book)}`}
                      className="
                        flex-1
                        bg-yellow-400
                        hover:bg-yellow-300
                        transition
                        text-black
                        py-3
                        rounded-2xl
                        font-bold
                        text-center
                      "
                    >
                      Preview
                    </Link>

                    <button
                      onClick={() => {
                        if (!book._id) {
                          navigate("/books");
                          return;
                        }

                        addToCart(book);

                        navigate("/checkout");
                      }}
                      className="
                        flex-1
                        border border-white/10
                        hover:border-yellow-400/30
                        hover:bg-white/5
                        transition
                        text-white
                        py-3
                        rounded-2xl
                        font-semibold
                      "
                    >
                      {book._id
                        ? "Buy Now"
                        : "View Catalog"}
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
