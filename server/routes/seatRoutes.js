import { Router } from "express";
import {
  bookSeat,
  getEventSeats,
  holdSeat,
} from "../controllers/seatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:eventId", getEventSeats);
router.post("/book", protect, bookSeat);
router.post("/hold", protect, holdSeat);

export default router;
