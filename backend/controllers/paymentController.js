import axios from "axios";

import Order from "../models/Order.js";

import Book from "../models/Book.js";

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
      user,
    } = req.body;

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

    // CREATE ORDER
    const order =
      await Order.create({
        books: cart.map(
          (item) => item.id
        ),

        totalAmount,

        paymentReference:
          reference,

        paymentStatus: "paid",
      });

    // UPDATE SALES
    for (const item of cart) {
      await Book.findByIdAndUpdate(
        item.id,
        {
          $inc: {
            sales: 1,
            downloads: 1,
          },
        }
      );
    }

    res.json({
      success: true,
      message:
        "Payment verified",

      order,

      purchases: cart,
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