import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "evently" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      },
    );
    stream.end(fileBuffer);
  });
};
