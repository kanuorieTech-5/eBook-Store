import express from "express";

import { createBook, getBooks, getBook, updateBook, deleteBook, } from "../controllers/bookController.js";

import upload from "../middleware/uploadMiddleware.js";

import { protect, } from "../middleware/authMiddleware.js";

import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// =========================
// GET ALL BOOKS
// =========================
router.get("/", getBooks);

// =========================
// GET SINGLE BOOK
// =========================
router.get("/:id", getBook);

// =========================
// CREATE BOOK
// =========================
router.post(
  "/",
  protect,

  upload.fields([
    {
      name: "cover",
      maxCount: 1,
    },

    {
      name: "file",
      maxCount: 1,
    },

    {
      name: "preview",
      maxCount: 1,
    },
  ]),

  createBook
);

// =========================
// UPDATE BOOK
// =========================
router.put(
  "/:id",
  protect,
  updateBook
);

// =========================
// DELETE BOOK
// =========================
router.delete(
  "/:id",
  protect,
  deleteBook
);

export default router;