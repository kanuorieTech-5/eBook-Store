import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

// =========================
// CONFIG
// =========================
dotenv.config();

// =========================
// DATABASE
// =========================
connectDB();

// =========================
// APP
// =========================
const app = express();

// =========================
// CORS
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:5173",

      "https://e-book-store-8cn5mqc6j-uketbooks-team.vercel.app",

      "https://uketbooks-frontend-7cnt.onrender.com",
    ],

    credentials: true,
  })
);

// =========================
// MIDDLEWARE
// =========================
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =========================
// STATIC FILES
// =========================
app.use(
  "/uploads",
  express.static("uploads")
);

// =========================
// API ROUTES
// =========================
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/books",
  bookRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/uploads",
  uploadRoutes
);

app.use(
  "/api/webhooks",
  webhookRoutes
);

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,

    message:
      "Ebook Store API Running 🚀",
  });
});

// =========================
// 404 HANDLER
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: "Route not found",
  });
});

// =========================
// SERVER
// =========================
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

