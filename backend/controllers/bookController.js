import Book from "../models/Book.js";
import { io } from "../server.js";
// =========================
// CREATE BOOK
// =========================
const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      price,
      originalPrice,
      pages,
      language,
      featured,
      featuredTitle,
      justArrived,
      bestSeller,
      recommended,
      deals,
      comingSoon,
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
      originalPrice,
      cover,
      file,
      preview,
      pages,
      language,
      featured: featured === "true",
      featuredTitle: featuredTitle === "true",
      justArrived: justArrived === "true",
      bestSeller: bestSeller === "true",
      recommended: recommended === "true",
      deals: deals === "true",
      comingSoon: comingSoon === "true",
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
const updateBook = async (req, res) => {
  try {
    console.log("\n========== UPDATE REQUEST ==========");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const book = await Book.findById(req.params.id);

    if (!book) {
      console.log("BOOK NOT FOUND");
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    console.log("CURRENT BOOK:");
    console.log(book);

    const updateData = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      category: req.body.category,
      price: Number(req.body.price),
      originalPrice: Number(req.body.originalPrice),
      pages: Number(req.body.pages),
      language: req.body.language,

      featured: req.body.featured === "true",
      featuredTitle: req.body.featuredTitle === "true",
      justArrived: req.body.justArrived === "true",
      bestSeller: req.body.bestSeller === "true",
      recommended: req.body.recommended === "true",
      deals: req.body.deals === "true",
      comingSoon: req.body.comingSoon === "true",
    };

    if (req.files?.cover?.length) {
      updateData.cover = req.files.cover[0].path;
    }

    if (req.files?.file?.length) {
      updateData.file = req.files.file[0].path;
    }

    if (req.files?.preview?.length) {
      updateData.preview = req.files.preview[0].path;
    }

    console.log("UPDATE DATA:");
    console.log(updateData);

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("UPDATED BOOK:");
    console.log(updatedBook);

    io.emit("statsUpdated");

    res.json({
      success: true,
      book: updatedBook,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);

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
