import "dotenv/config";
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import seatRoutes from "./routes/seatRoutes.js";
import { prisma } from "./config/prisma.js";
import orderRoutes from "./routes/orderRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import { apiLimiter, authLimiter } from "./middleware/rateLimiter.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET environment variable is missing.");
  process.exit(1);
}

const app = express();
app.disable("x-powered-by");

const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
      .map((s) => s.trim())
      .filter((s) => s && s !== "*")
  : defaultOrigins;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);
app.use(express.json());

app.use("/api", apiLimiter);

app.get("/api/health", async (req, res) => {
  try {
    const startTime = Date.now();
    await prisma.event.findFirst({ select: { id: true } });
    const latency = Date.now() - startTime;
    res.json({
      status: "ok",
      database: "connected",
      latencyMs: latency,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check database failure:", error.message);
    res.status(503).json({
      status: "error",
      database: "disconnected",
      message: "Database service is currently unavailable",
      timestamp: new Date().toISOString(),
    });
  }
});
app.use("/api/events", eventRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);

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
