import express from "express";

const router = express.Router();

// =========================
// CONTACT FORM
// =========================
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      message,
    } = req.body;

    console.log(
      "Contact Message:",
      {
        name,
        email,
        message,
      }
    );

    res.status(200).json({
      success: true,

      message:
        "Message sent successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message:
        "Failed to send message",
    });
  }
});

export default router;
