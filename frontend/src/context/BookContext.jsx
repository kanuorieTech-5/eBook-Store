import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { books as initialBooks }
from "../data/books";

import {
  getBooks,
} from "../services/bookService";

import {
  isSameBook,
} from "../utils/bookIds";

const BookContext =
  createContext();

export function BookProvider({
  children,
}) {

  const [books, setBooks] =
    useState(() => {

      const savedBooks =
        localStorage.getItem(
          "uketbooks-books"
        );

      return savedBooks
        ? JSON.parse(savedBooks)
        : initialBooks;
    });

  /* SAVE TO STORAGE */
  useEffect(() => {

    localStorage.setItem(
      "uketbooks-books",
      JSON.stringify(books)
    );

  }, [books]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks();

        if (data?.books?.length) {
          setBooks(data.books);
        }
      } catch (error) {
        console.warn(
          "Using local fallback books because the API is unavailable."
        );
      }
    };

    loadBooks();
  }, []);

  /* ADD BOOK */
  const addBook = (book) => {

    const newBook = {
      ...book,

      id: Date.now(),

      createdAt:
        new Date().toISOString(),
    };

    setBooks((prev) => [
      newBook,
      ...prev,
    ]);
  };

  /* DELETE BOOK */
  const deleteBook = (id) => {

    setBooks((prev) =>
      prev.filter(
        (book) =>
          !isSameBook(book, id)
      )
    );
  };

  /* UPDATE BOOK */
  const updateBook = (
    id,
    updatedBook
  ) => {

    setBooks((prev) =>
      prev.map((book) =>
        isSameBook(book, id)
          ? {
              ...book,
              ...updatedBook,
            }
          : book
      )
    );
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        deleteBook,
        updateBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export const useBooks = () =>
  useContext(BookContext);
