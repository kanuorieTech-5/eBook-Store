import axios from "axios";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Book from "../models/Book.js";
import User from "../models/User.js";
import sendReceipt from "../utils/sendReceipt.js";
// =========================
// VERIFY PAYMENT
// =========================
const verifyPayment = async (
  req,
  res
) => {
  try {
    const {
      reference,
      cart,
    } = req.body;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message:
          "Payment reference is required",
      });
    }

    if (
      !Array.isArray(cart) ||
      cart.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Cart is empty",
      });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message:
          "Payment provider is not configured",
      });
    }

    // VERIFY FROM PAYSTACK
    const response =
      await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

    const paymentData =
      response.data.data;

    // PAYMENT FAILED
    if (
      paymentData.status !==
      "success"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment not verified",
      });
    }

    // TOTAL
    const totalAmount =
      paymentData.amount / 100;

    const normalisedCart =
      cart.map((item) => ({
        ...item,
        id: item._id || item.id,
        quantity: Number(
          item.quantity || 1
        ),
        price: Number(item.price),
      }));

    const mongoBookIds =
      normalisedCart
        .map((item) => item.id)
        .filter((id) =>
          mongoose.Types.ObjectId.isValid(id)
        );

    if (
      mongoBookIds.length !==
      normalisedCart.length
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Cart contains books that are not available in the store catalog",
      });
    }

    const dbBooks =
      mongoBookIds.length
        ? await Book.find({
            _id: {
              $in: mongoBookIds,
            },
          })
        : [];

    const dbBookMap =
      new Map(
        dbBooks.map((book) => [
          book._id.toString(),
          book,
        ])
      );

    if (
      dbBookMap.size !==
      new Set(
        mongoBookIds.map(String)
      ).size
    ) {
      return res.status(400).json({
        success: false,
        message:
          "One or more books in the cart could not be found",
      });
    }

    const purchases =
      normalisedCart.map((item) => {
        const dbBook =
          dbBookMap.get(
            String(item.id)
          );

        return dbBook
          ? {
              id: dbBook._id.toString(),
              _id: dbBook._id,
              title: dbBook.title,
              author: dbBook.author,
              price: dbBook.price,
              cover: dbBook.cover,
              file: dbBook.file,
              preview: dbBook.preview,
              quantity: item.quantity,
            }
          : item;
      });

    const expectedTotal =
      purchases.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) *
            Number(item.quantity || 1),
        0
      );

    if (expectedTotal <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cart total is invalid",
      });
    }

    if (
      Math.round(expectedTotal) !==
      Math.round(totalAmount)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment amount does not match cart total",
      });
    }

    // CREATE ORDER
    const order =
      await Order.create({
        user: req.user._id,

        books: mongoBookIds,

        totalAmount,

        paymentReference:
          reference,

        paymentStatus: "paid",
      });

      await sendReceipt({
      email: user.email,

      books: cart,

      amount:
        paymentData.amount / 100,

      reference,
    });

    // UPDATE SALES
    for (const item of normalisedCart) {
      if (
        mongoose.Types.ObjectId.isValid(
          item.id
        )
      ) {
        await Book.findByIdAndUpdate(
          item.id,
          {
            $inc: {
              sales: Number(
                item.quantity || 1
              ),
              downloads: Number(
                item.quantity || 1
              ),
            },
          }
        );
      }
    }

    if (mongoBookIds.length) {
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $addToSet: {
            purchases: {
              $each: mongoBookIds,
            },
          },
        }
      );
    }

    res.json({
      success: true,
      message:
        "Payment verified",

      order,

      purchases,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Payment verification failed",
    });
  }
};

export { verifyPayment };
