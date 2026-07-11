import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getBooks);
router.get("/:id", getBook);

// ADMIN ONLY
router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
    { name: "preview", maxCount: 1 },
  ]),
  createBook
);

router.put("/:id", protect, adminOnly,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
    { name: "preview", maxCount: 1 },
  ]),
  updateBook
);
router.delete("/:id", protect, adminOnly, deleteBook);

export default router;