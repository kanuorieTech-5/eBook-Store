import express from "express";

const router =
  express.Router();

router.post(
  "/paystack",

  (req, res) => {
    console.log(
      "Webhook received:",
      req.body
    );

    res.sendStatus(200);
  }
);

export default router;