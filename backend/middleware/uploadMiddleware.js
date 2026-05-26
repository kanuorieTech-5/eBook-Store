import multer from "multer";

import {
  CloudinaryStorage,
} from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";


// ===============================
// COVER IMAGE STORAGE
// ===============================
const coverStorage =
  new CloudinaryStorage({
    cloudinary,

    params: {
      folder:
        "ebook-store/covers",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],
    },
  });


// ===============================
// PDF STORAGE
// ===============================
const pdfStorage =
  new CloudinaryStorage({
    cloudinary,

    params: {
      folder:
        "ebook-store/books",

      resource_type: "raw",

      allowed_formats: [
        "pdf",
        "epub",
      ],
    },
  });


// ===============================
// MULTER EXPORTS
// ===============================
export const uploadCover =
  multer({
    storage: coverStorage,
  });

export const uploadBook =
  multer({
    storage: pdfStorage,
  });