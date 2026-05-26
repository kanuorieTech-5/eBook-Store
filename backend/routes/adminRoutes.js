import express from "express";

import {
  getDashboardStats,
  getAllUsers,
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/adminController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// DASHBOARD
router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboardStats
);

// USERS
router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

// BOOKS
router.get(
  "/books",
  protect,
  adminOnly,
  getAllBooks
);

router.post(
  "/books",
  protect,
  adminOnly,
  createBook
);

router.put(
  "/books/:id",
  protect,
  adminOnly,
  updateBook
);

router.delete(
  "/books/:id",
  protect,
  adminOnly,
  deleteBook
);

export default router;