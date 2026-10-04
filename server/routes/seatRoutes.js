import { Router } from "express";
import {
  getEventSeats,
  holdSeat,
  releaseSeats,
} from "../controllers/seatController.js";
import { protect } from "../middleware/authMiddleware.js";
import { holdLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.get("/:eventId", getEventSeats);
router.post("/hold", holdLimiter, protect, holdSeat);
router.post("/release", protect, releaseSeats);

export default router;
