import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { books as initialBooks }
from "../data/books";

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
        (book) => book.id !== id
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
        book.id === id
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