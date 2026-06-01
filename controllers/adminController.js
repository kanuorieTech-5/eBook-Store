import User from "../models/User.js";
import Book from "../models/Book.js";
import Order from "../models/Order.js";

// =========================================
// DASHBOARD STATS
// =========================================
export const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const booksCount = await Book.countDocuments();
    const orders = await Order.find();

    const revenue = orders.reduce((total, order) => {
      return total + Number(order.amount || 0);
    }, 0);

    const downloads = orders.length;

    // 🧠 optional: recent activity (last 7 days)
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const recentOrders = await Order.find({
      createdAt: { $gte: last7Days },
    });

    const weeklyRevenue = recentOrders.reduce((sum, o) => {
      return sum + Number(o.amount || 0);
    }, 0);

    res.status(200).json({
      success: true,
      stats: {
        users: usersCount,
        books: booksCount,
        downloads,
        revenue,
        weeklyRevenue,
        lastUpdated: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

// =========================================
// GET ALL BOOKS (ADMIN)
// =========================================
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.error("Get Books Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
    });
  }
};


// =========================================
// CREATE BOOK (ADMIN)
// =========================================
export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      book,
    });
  } catch (error) {
    console.error("Create Book Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create book",
    });
  }
};


// =========================================
// UPDATE BOOK (ADMIN)
// =========================================
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.error("Update Book Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update book",
    });
  }
};


// =========================================
// DELETE BOOK (ADMIN)
// =========================================
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Delete Book Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
    });
  }
};


// =========================================
// GET ALL USERS (ADMIN)
// =========================================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};