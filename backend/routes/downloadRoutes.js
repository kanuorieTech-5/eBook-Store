import express from "express";
import jwt from "jsonwebtoken";
import path from "path";

const router = express.Router();

router.get("/download/:token", (req, res) => {
  try {
    const decoded = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET
    );

    const filePath = path.resolve(decoded.file);

    res.download(filePath);
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired download link",
    });
  }
});

export default router;