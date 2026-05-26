import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

/* STATIC FILES */
app.use(
  "/uploads",
  express.static("uploads")
);

/* ROUTES */
app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);

app.use(
  "/api/payments",
  paymentRoutes
);

/* TEST */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Ebook Store API Running 🚀",
  });
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});