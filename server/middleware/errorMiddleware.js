export const notFound = (req, res, next) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode !== 200 ? res.statusCode : err.statusCode || 500;

  console.error("Server Error : ", err.message);

  res.status(statusCode).json({
    error: err.message || "Internal server error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
