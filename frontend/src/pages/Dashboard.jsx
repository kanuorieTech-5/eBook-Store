import { useEffect, useMemo, useState, useContext } from "react";

import { getBooks, createBook, updateBook as updateBookService, deleteBook as deleteBookService, } from "../services/bookService";

import { FaBook, FaEdit, FaTrash, FaUsers, FaMoneyBillWave, FaDownload, FaPlus, FaSearch, FaStar, FaChartLine, FaFilePdf, FaImage, } from "react-icons/fa";

import { usePurchases } from "../context/PurchaseContext";
import {
  getBookId,
} from "../utils/bookIds";

export default function Dashboard() {
  // =========================================
  // STATES
  // =========================================
  const [books, setBooks] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      author: "",
      description: "",
      category: "",

      price: "",

      cover: "",
      file: "",
      preview: "",

      featured: false,
      bestseller: false,

      pages: "",
      language: "English",
    });

  // =========================================
  // PURCHASES
  // =========================================
  const { purchases } =
    usePurchases();

  // =========================================
  // FETCH BOOKS
  // =========================================
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const data =
        await getBooks();

      setBooks(data.books || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // ANALYTICS
  // =========================================
  const stats = useMemo(() => {
    const revenue =
      purchases.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0),
        0
      );

    const downloads =
      purchases.length;

    const booksSold =
      purchases.length;

    const users =
      new Set(
        purchases.map(
          (item) => item.email
        )
      ).size || 1;

    return {
      revenue,
      downloads,
      booksSold,
      users,
    };
  }, [purchases]);

  // =========================================
  // FILTERED BOOKS
  // =========================================
  const filteredBooks =
    books.filter((book) =>
      book.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // =========================================
  // RESET FORM
  // =========================================
  const resetForm = () => {
    setEditingId(null);

    setForm({
      title: "",
      author: "",
      description: "",
      category: "",

      price: "",

      cover: "",
      file: "",
      preview: "",

      featured: false,
      bestseller: false,

      pages: "",
      language: "English",
    });
  };

  // =========================================
  // INPUT CHANGE
  // =========================================
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // =========================================
  // COVER UPLOAD
  // =========================================
  const handleCoverUpload = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        cover:
          reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // =========================================
  // BOOK FILE UPLOAD
  // =========================================
  const handleBookUpload = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,

        file:
          reader.result,

        preview:
          reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // =========================================
  // CREATE / UPDATE BOOK
  // =========================================
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      if (
        !form.title ||
        !form.author ||
        !form.price
      ) {
        return alert(
          "Please fill all required fields."
        );
      }

      const payload = {
        ...form,

        price: Number(
          form.price
        ),

        pages: Number(
          form.pages
        ),

        updatedAt:
          new Date().toISOString(),
      };

      // UPDATE
      if (editingId) {
        const updated =
          await updateBookService(
            editingId,
            payload
          );

        setBooks((prev) =>
          prev.map((book) =>
            book._id === editingId
              ? updated.book
              : book
          )
        );
      }

      // CREATE
      else {
        const created =
          await createBook(
            payload
          );

        setBooks((prev) => [
          created.book,
          ...prev,
        ]);
      }

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // EDIT
  // =========================================
  const handleEdit = (book) => {
    setEditingId(book._id);

    setForm(book);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // DELETE
  // =========================================
  const handleDelete = async (
    id
  ) => {
    try {
      const confirmDelete =
        window.confirm(
          "Delete this book?"
        );

      if (!confirmDelete) return;

      await deleteBookService(id);

      setBooks((prev) =>
        prev.filter(
          (book) =>
            book._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      className="
        min-h-screen
        px-4
        md:px-8
        py-10
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
        "
      >
        {/* =========================================
            HEADER
        ========================================= */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            mb-10
          "
        >
          <div>
            <h1
              className="
                text-4xl
                md:text-5xl
                font-black
                mb-2
              "
            >
              Admin Dashboard
            </h1>

            <p
              className="
                text-gray-400
              "
            >
              Manage books,
              sales, uploads,
              analytics &
              digital products.
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-2

              px-5
              py-3

              rounded-2xl

              bg-yellow-400
              text-black

              font-bold
            "
          >
            <FaChartLine />

            Live Store Analytics
          </div>
        </div>

        {/* =========================================
            STATS
        ========================================= */}
        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-5
            mb-10
          "
        >
          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                justify-between
                mb-4
              "
            >
              <FaMoneyBillWave
                className="
                  text-yellow-400
                  text-2xl
                "
              />

              <span
                className="
                  text-xs
                  text-green-400
                "
              >
                +12%
              </span>
            </div>

            <p
              className="
                text-gray-400
                mb-2
              "
            >
              Revenue
            </p>

            <h2
              className="
                text-3xl
                font-black
              "
            >
              ₦
              {stats.revenue.toLocaleString()}
            </h2>
          </div>

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >
            <div
              className="
                flex
                justify-between
                mb-4
              "
            >
              <FaDownload
                className="
                  text-purple-400
                  text-2xl
                "
              />

              <span
                className="
                  text-xs
                  text-green-400
                "
              >
                +8%
              </span>
            </div>

            <p
              className="
                text-gray-400
                mb-2
              "
            >
              Downloads
            </p>

            <h2
              className="
                text-3xl
                font-black
              "
            >
              {stats.downloads}
            </h2>
          </div>

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >
            <div
              className="
                flex
                justify-between
                mb-4
              "
            >
              <FaBook
                className="
                  text-blue-400
                  text-2xl
                "
              />

              <span
                className="
                  text-xs
                  text-green-400
                "
              >
                +15%
              </span>
            </div>

            <p
              className="
                text-gray-400
                mb-2
              "
            >
              Books
            </p>

            <h2
              className="
                text-3xl
                font-black
              "
            >
              {books.length}
            </h2>
          </div>

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
            "
          >
            <div
              className="
                flex
                justify-between
                mb-4
              "
            >
              <FaUsers
                className="
                  text-green-400
                  text-2xl
                "
              />

              <span
                className="
                  text-xs
                  text-green-400
                "
              >
                +4%
              </span>
            </div>

            <p
              className="
                text-gray-400
                mb-2
              "
            >
              Users
            </p>

            <h2
              className="
                text-3xl
                font-black
              "
            >
              {stats.users}
            </h2>
          </div>
        </div>

        {/* =========================================
            BOOK MANAGER
        ========================================= */}
        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-6
            md:p-8
            mb-10
            backdrop-blur-xl
          "
        >
          {/* TOP */}
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-5
              mb-8
            "
          >
            <div>
              <h2
                className="
                  text-2xl
                  font-black
                  mb-2
                "
              >
                Book Manager
              </h2>

              <p
                className="
                  text-gray-400
                "
              >
                Upload, edit and
                manage digital
                ebooks.
              </p>
            </div>

            {/* SEARCH */}
            <div
              className="
                relative
                w-full
                lg:w-80
              "
            >
              <FaSearch
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />

              <input
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3

                  bg-black/30
                  border
                  border-white/10

                  rounded-2xl

                  outline-none
                "
              />
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={
              handleSubmit
            }
            className="
              grid
              md:grid-cols-2
              gap-5
              mb-10
            "
          >
            <input
              name="title"
              value={form.title}
              onChange={
                handleChange
              }
              placeholder="Book title"
              className="
                p-4
                rounded-2xl
                bg-black/30
                border
                border-white/10
              "
            />

            <input
              name="author"
              value={form.author}
              onChange={
                handleChange
              }
              placeholder="Author"
              className="
                p-4
                rounded-2xl
                bg-black/30
                border
                border-white/10
              "
            />

            <input
              name="price"
              value={form.price}
              onChange={
                handleChange
              }
              placeholder="Price"
              className="
                p-4
                rounded-2xl
                bg-black/30
                border
                border-white/10
              "
            />

            <input
              name="category"
              value={form.category}
              onChange={
                handleChange
              }
              placeholder="Category"
              className="
                p-4
                rounded-2xl
                bg-black/30
                border
                border-white/10
              "
            />

            <input
              name="pages"
              value={form.pages}
              onChange={
                handleChange
              }
              placeholder="Pages"
              className="
                p-4
                rounded-2xl
                bg-black/30
                border
                border-white/10
              "
            />

            <input
              name="language"
              value={form.language}
              onChange={
                handleChange
              }
              placeholder="Language"
              className="
                p-4
                rounded-2xl
                bg-black/30
                border
                border-white/10
              "
            />

            <textarea
              name="description"
              value={
                form.description
              }
              onChange={
                handleChange
              }
              placeholder="Description..."
              rows="5"
              className="
                md:col-span-2
                p-4
                rounded-2xl
                bg-black/30
                border
                border-white/10
              "
            />

            {/* COVER */}
            <div
              className="
                bg-black/20
                border
                border-white/10
                rounded-3xl
                p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-4
                "
              >
                <FaImage />

                <h3
                  className="
                    font-bold
                  "
                >
                  Cover Upload
                </h3>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleCoverUpload
                }
                className="
                  w-full
                  text-sm
                  file:bg-yellow-400
                  file:border-0
                  file:px-4
                  file:py-2
                  file:rounded-xl
                  file:text-black
                  file:font-bold
                "
              />

              {form.cover && (
                <img
                  src={form.cover}
                  alt="Preview"
                  className="
                    mt-5
                    w-40
                    h-56
                    object-cover
                    rounded-2xl
                  "
                />
              )}
            </div>

            {/* PDF */}
            <div
              className="
                bg-black/20
                border
                border-white/10
                rounded-3xl
                p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-4
                "
              >
                <FaFilePdf />

                <h3
                  className="
                    font-bold
                  "
                >
                  Ebook Upload
                </h3>
              </div>

              <input
                type="file"
                accept=".pdf,.epub"
                onChange={
                  handleBookUpload
                }
                className="
                  w-full
                  text-sm
                  file:bg-purple-600
                  file:border-0
                  file:px-4
                  file:py-2
                  file:rounded-xl
                  file:text-white
                  file:font-bold
                "
              />

              {form.file && (
                <p
                  className="
                    mt-4
                    text-green-400
                    text-sm
                  "
                >
                  Ebook uploaded
                  successfully
                </p>
              )}
            </div>

            {/* CHECKBOXES */}
            <div
              className="
                flex
                gap-6
                md:col-span-2
              "
            >
              <label
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <input
                  type="checkbox"
                  name="featured"
                  checked={
                    form.featured
                  }
                  onChange={
                    handleChange
                  }
                />

                Featured
              </label>

              <label
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <input
                  type="checkbox"
                  name="bestseller"
                  checked={
                    form.bestseller
                  }
                  onChange={
                    handleChange
                  }
                />

                Bestseller
              </label>
            </div>

            {/* BUTTONS */}
            <div
              className="
                flex
                gap-4
                md:col-span-2
              "
            >
              <button
                type="submit"
                className="
                  flex
                  items-center
                  gap-2

                  bg-yellow-400
                  hover:bg-yellow-300

                  text-black
                  font-bold

                  px-8
                  py-4

                  rounded-2xl
                  transition-all
                "
              >
                <FaPlus />

                {editingId
                  ? "Update Book"
                  : "Add Book"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={
                    resetForm
                  }
                  className="
                    px-8
                    py-4

                    rounded-2xl

                    border
                    border-white/10
                  "
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* BOOKS */}
          <div
            className="
              space-y-4
            "
          >
            {filteredBooks.map(
              (book) => (
                <div
                  key={getBookId(book)}
                  className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between

                    gap-5

                    p-5

                    bg-black/20
                    border
                    border-white/10

                    rounded-3xl
                  "
                >
                  <div
                    className="
                      flex
                      gap-5
                    "
                  >
                    <img
                      src={
                        book.cover
                      }
                      alt={
                        book.title
                      }
                      className="
                        w-24
                        h-32
                        object-cover
                        rounded-2xl
                      "
                    />

                    <div>
                      <h3
                        className="
                          text-xl
                          font-bold
                          mb-2
                        "
                      >
                        {book.title}
                      </h3>

                      <p
                        className="
                          text-gray-400
                          mb-2
                        "
                      >
                        {
                          book.author
                        }
                      </p>

                      <div
                        className="
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        <span
                          className="
                            px-3
                            py-1
                            rounded-full
                            bg-purple-600/20
                            text-purple-300
                            text-xs
                          "
                        >
                          {
                            book.category
                          }
                        </span>

                        {book
                          .featured && (
                          <span
                            className="
                              flex
                              items-center
                              gap-1

                              px-3
                              py-1

                              rounded-full

                              bg-yellow-400/20
                              text-yellow-300

                              text-xs
                            "
                          >
                            <FaStar />

                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div
                    className="
                      flex
                      gap-3
                    "
                  >
                    <button
                      onClick={() =>
                        handleEdit(
                          book
                        )
                      }
                      className="
                        flex
                        items-center
                        gap-2

                        px-5
                        py-3

                        rounded-2xl

                        bg-yellow-400
                        text-black
                        font-bold
                      "
                    >
                      <FaEdit />

                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          getBookId(book)
                        )
                      }
                      className="
                        flex
                        items-center
                        gap-2

                        px-5
                        py-3

                        rounded-2xl

                        bg-red-600
                        font-bold
                      "
                    >
                      <FaTrash />

                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* =========================================
            RECENT PURCHASES
        ========================================= */}
        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            p-6
            md:p-8
            backdrop-blur-xl
          "
        >
          <h2
            className="
              text-2xl
              font-black
              mb-8
            "
          >
            Recent Purchases
          </h2>

          {purchases.length ===
          0 ? (
            <p
              className="
                text-gray-400
              "
            >
              No purchases yet.
            </p>
          ) : (
            <div
              className="
                space-y-4
              "
            >
              {purchases
                .slice(0, 10)
                .map(
                  (
                    order,
                    index
                  ) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        justify-between

                        p-4

                        bg-black/20
                        border
                        border-white/10

                        rounded-2xl
                      "
                    >
                      <div>
                        <h3
                          className="
                            font-bold
                            mb-1
                          "
                        >
                          {
                            order.title
                          }
                        </h3>

                        <p
                          className="
                            text-sm
                            text-gray-400
                          "
                        >
                          Digital
                          Purchase
                        </p>
                      </div>

                      <div
                        className="
                          text-right
                        "
                      >
                        <p
                          className="
                            font-bold
                            text-yellow-400
                          "
                        >
                          ₦
                          {
                            order.price
                          }
                        </p>

                        <p
                          className="
                            text-green-400
                            text-sm
                          "
                        >
                          Paid
                        </p>
                      </div>
                    </div>
                  )
                )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
