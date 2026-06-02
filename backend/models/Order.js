import mongoose from "mongoose";

const orderSchema =
  new mongoose.Schema(
    {
      userEmail: {
        type: String,
        required: true,
      },

      books: [
        {
          title: String,
          price: Number,
          coverImage: String,
          downloadUrl: String,
        },
      ],

      totalAmount: {
        type: Number,
        required: true,
      },

      paymentReference: {
        type: String,
        required: true,
        unique: true,
      },

      paymentStatus: {
        type: String,
        default: "paid",
      },
    },

    {
      timestamps: true,
    }
  );

const Order =
  mongoose.model(
    "Order",
    orderSchema
  );

export default Order;