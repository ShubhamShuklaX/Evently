import "dotenv/config";
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import seatRoutes from "./routes/seatRoutes.js";
import { prisma } from "./config/prisma.js";
import orderRoutes from "./routes/orderRoutes.js";
import { apiLimiter, authLimiter } from "./middleware/rateLimiter.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET environment variable is missing.");
  process.exit(1);
}

const app = express();
app.disable("x-powered-by");

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.use("/api", apiLimiter);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/orders", orderRoutes);

const cleanupTimer = setInterval(async () => {
  try {
    await prisma.seat.updateMany({
      where: { status: "held", expiresAt: { lt: new Date() } },
      data: { status: "available", userId: null, expiresAt: null },
    });
  } catch (error) {
    console.error("Expired seats cleanup error:", error.message);
  }
}, 60000);

app.use(notFound);
app.use(errorHandler);

try {
  await prisma.$connect();
  console.log("Database connected successfully");

  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT || 5000, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const gracefulShutdown = async () => {
    console.log("Shutting down gracefully...");
    clearInterval(cleanupTimer);
    server.close(async () => {
      console.log("HTTP server closed. Disconnecting database...");
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1);
}
