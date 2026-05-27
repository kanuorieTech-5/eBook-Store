import multer from "multer";

import {
  CloudinaryStorage,
} from "multer-storage-cloudinary";

import cloudinary
  from "../config/cloudinary.js";

const storage =
  new CloudinaryStorage({
    cloudinary,

    params: async (
      req,
      file
    ) => ({
      folder: "uketbooks",

      resource_type: "auto",

      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "webp",
        "pdf",
      ],
    }),
  });

const upload = multer({
  storage,
});

export default upload;