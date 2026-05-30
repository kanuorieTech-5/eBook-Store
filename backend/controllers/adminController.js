import User from "../models/User.js";
import Book from "../models/Book.js";
import Order from "../models/Order.js";

export const getDashboardStats = async (
  req,
  res
) => {
  try {
    const users =
      await User.countDocuments();

    const books =
      await Book.countDocuments();

    const orders =
      await Order.find();

    const downloads =
      orders.length;

    const revenue =
      orders.reduce(
        (total, order) =>
          total + order.amount,
        0
      );

    res.status(200).json({
      users,
      books,
      downloads,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to fetch dashboard stats",
    });
  }
};