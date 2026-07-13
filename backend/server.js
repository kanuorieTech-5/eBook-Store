import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  "http://localhost:5173",

  // your Vercel frontend (IMPORTANT - add ALL variants)
  "https://uketbooks-store.vercel.app",
  "https://uketbooks-store-6jv5nsnsz-uketbooks-team.vercel.app",

  // optional older Render frontend
  "https://uketbooks-frontend-7cnt.onrender.com",
];
// =========================
// SOCKET.IO
// =========================
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
 
io.on("connection", (socket) => {
  console.log("Admin connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Admin disconnected");
  });
});

// // =========================
// // MIDDLEWARE
// // =========================
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", origin);
    return callback(null, true); // Allow all origins for testing, but log blocked ones
  },
  credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =========================
// ROUTES
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/downloads", downloadRoutes);
// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ebook Store API Running 🚀",
  });
});

// =========================
// 404
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =========================
// SERVER START
// =========================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();