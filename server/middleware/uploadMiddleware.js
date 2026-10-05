import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 Megabytes limit
    files: 1, // Only 1 file per upload
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPG, PNG, and WEBP images are allowed.",
        ),
        false,
      );
    }
  },
});

// Magic Byte Header Signature Validation (Buffer Sniffing)
export const validateImageSignature = (buffer) => {
  if (!buffer || buffer.length < 12) return false;

  // JPEG: FF D8 FF
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  const isPng =
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a;

  // WEBP: "RIFF" .... "WEBP"
  const isWebp =
    buffer[0] === 0x52 && // R
    buffer[1] === 0x49 && // I
    buffer[2] === 0x46 && // F
    buffer[3] === 0x46 && // F
    buffer[8] === 0x57 && // W
    buffer[9] === 0x45 && // E
    buffer[10] === 0x42 && // B
    buffer[11] === 0x50; // P

  return isJpeg || isPng || isWebp;
};

// Express Middleware to reject spoofed files (e.g. malware.exe renamed to banner.png)
export const verifyImageSignature = (req, res, next) => {
  if (!req.file) return next();

  if (!validateImageSignature(req.file.buffer)) {
    return res.status(400).json({
      error:
        "Security Alert: Corrupted or spoofed image detected. File header bytes do not match a valid JPEG, PNG, or WEBP binary.",
    });
  }

  next();
};

export const uploadToCloudinary = (fileBuffer) => {
  // Defensive check inside uploadToCloudinary as well
  if (!validateImageSignature(fileBuffer)) {
    throw new Error(
      "Binary signature verification failed. Only valid JPEG, PNG, or WEBP images can be uploaded.",
    );
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "evently",
        resource_type: "image",
        transformation: [
          // Enforce 16:9 landscape aspect ratio with smart subject framing
          { aspect_ratio: "16:9", crop: "fill", gravity: "auto" },
          { width: 1920, height: 1080, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      },
    );
    stream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (imageUrl) => {
  try {
    // Only delete if it's actually hosted on Cloudinary
    if (!imageUrl?.includes("res.cloudinary.com")) return;

    const parts = imageUrl.split("/upload/");
    if (parts.length < 2) return;

    const pathWithoutVersion = parts[1].replace(/^v\d+\//, "");
    const publicId = pathWithoutVersion.substring(
      0,
      pathWithoutVersion.lastIndexOf("."),
    );

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Cloudinary deletion failed:", error.message);
  }
};
