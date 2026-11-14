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

  // Log detailed error internally
  console.error(
    `[${new Date().toISOString()}] Server Error (${statusCode}):`,
    err,
  );

  // In production, mask unhandled 500 internal errors while preserving 4xx safe client messages
  const isProduction = process.env.NODE_ENV === "production";
  const errorMessage =
    statusCode >= 500 && isProduction
      ? "An unexpected internal server error occurred"
      : err.message || "Internal server error";

  res.status(statusCode).json({
    error: errorMessage,
    ...(!isProduction && { stack: err.stack }),
  });
};
