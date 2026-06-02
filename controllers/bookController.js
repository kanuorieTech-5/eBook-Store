import Book from "../models/Book.js";
import { io } from "../server.js";
// =========================
// CREATE BOOK
// =========================
const createBook = async (
  req,
  res
) => {
  try {
    const {
      title,
      author,
      description,
      category,
      price,
      featured,
      bestseller,
      pages,
      language,
    } = req.body;

    const cover = req.files?.cover
      ? req.files.cover[0].path
      : "";

    const file = req.files?.file
      ? req.files.file[0].path
      : "";

    const preview =
      req.files?.preview
        ? req.files.preview[0].path
        : "";

    const book = await Book.create({
      title,
      author,
      description,
      category,
      price,

      cover,
      file,
      preview,

      featured,
      bestseller,

      pages,
      language,
    });

    io.emit("statsUpdated");

    res.status(201).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET ALL BOOKS
// =========================
const getBooks = async (
  req,
  res
) => {
  try {
    const books =
      await Book.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET SINGLE BOOK
// =========================
const getBook = async (
  req,
  res
) => {
  try {
    const book =
      await Book.findById(
        req.params.id
      );

    if (!book) {
      return res.status(404).json({
        success: false,
        message:
          "Book not found",
      });
    }

    res.json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// UPDATE BOOK
// =========================
const updateBook = async (
  req,
  res
) => {
  try {
    const book =
      await Book.findById(
        req.params.id
      );

    if (!book) {
      return res.status(404).json({
        success: false,
        message:
          "Book not found",
      });
    }

    const updatedBook =
      await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    io.emit("statsUpdated");

    res.json({
      success: true,
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// DELETE BOOK
// =========================
const deleteBook = async (
  req,
  res
) => {
  try {
    const book =
      await Book.findById(
        req.params.id
      );

    if (!book) {
      return res.status(404).json({
        success: false,
        message:
          "Book not found",
      });
    }

    await book.deleteOne();
    
    io.emit("statsUpdated");
    
    res.json({
      success: true,
      message:
        "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
