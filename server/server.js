import "dotenv/config";
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import seatRoutes from "./routes/seatRoutes.js";
import { prisma } from "./config/prisma.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/orders", orderRoutes);

try {
  await prisma.$connect();
  console.log("Database connected successfully");
} catch (error) {
  console.error("Database connection failed:", error);
}

setInterval(async () => {
  await prisma.seat.updateMany({
    where: { status: "held", expiresAt: { lt: new Date() } },
    data: { status: "available", userId: null, expiresAt: null },
  });
}, 60000);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
