export const notFound = (req, res, next) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
};

export const errorHandler = (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ error: "File too large. Maximum image size is 2MB." });
  }

  if (err.message && err.message.includes("Only JPG, PNG, and WEBP")) {
    return res.status(400).json({ error: err.message });
  }

  const statusCode =
    res.statusCode !== 200 ? res.statusCode : err.statusCode || 500;

  console.error("Server Error : ", err.message);

  res.status(statusCode).json({
    error: err.message || "Internal server error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
