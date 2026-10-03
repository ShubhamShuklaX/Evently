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

const app = express();
app.disable("x-powered-by");

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.use("/api", apiLimiter);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/orders", orderRoutes);

try {
  await prisma.$connect();
  console.log("Database connected successfully");
} catch (error) {
  console.error("Database connection failed:", error);
}

setInterval(async () => {
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
