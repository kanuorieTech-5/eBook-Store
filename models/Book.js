import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

   cover: {
      type: String,
      required: true,
    },

    file: {
      type: String,
      required: true,
    },

    preview: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    bestseller: {
      type: Boolean,
      default: false,
    },

    pages: {
      type: Number,
      default: 0,
    },

    language: {
      type: String,
      default: "English",
    },

    sales: {
      type: Number,
      default: 0,
    },

    downloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model(
  "Book",
  bookSchema
);

export default Book;