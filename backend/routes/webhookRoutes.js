import express from "express";
import crypto from "crypto";
import Order from "../models/Order.js";
import Book from "../models/Book.js";
import User from "../models/User.js";
import { io } from "../server.js";

const router = express.Router();

router.post("/paystack", async (req, res) => {
  try {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest("hex");

    const signature = req.headers["x-paystack-signature"];

    if (hash !== signature) {
      return res.status(401).json({
        success: false,
        message: "Invalid signature",
      });
    }

    const event = req.body;

    // ONLY handle successful payments
    if (event.event !== "charge.success") {
      return res.status(200).send("ignored");
    }

    const data = event.data;

    const metadata = data.metadata;

    const userId = metadata.userId;
    const cart = metadata.cart;

    const books = cart.map((item) => item._id);

    const totalAmount = data.amount / 100;

    // CREATE ORDER (TRUST ONLY WEBHOOK)
    const order = await Order.create({
      user: userId,
      books,
      totalAmount,
      paymentReference: data.reference,
      paymentStatus: "paid",
    });

    // UPDATE BOOK SALES
    for (const item of cart) {
      await Book.findByIdAndUpdate(item._id, {
        $inc: {
          sales: item.quantity || 1,
          downloads: item.quantity || 1,
        },
      });
    }

    // UPDATE USER PURCHASES
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        purchases: { $each: books },
      },
    });

    io?.emit("statsUpdated");

    return res.status(200).send("ok");
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).send("error");
  }
});

export default router;