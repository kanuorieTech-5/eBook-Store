import express from "express";

import upload
  from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  upload.single("file"),

  async (req, res) => {
    try {
      res.status(200).json({
        success: true,

        file: req.file.path,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }
);

export default router;