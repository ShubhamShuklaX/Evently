import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
} from "../controllers/eventController.js";

const router = Router();

router.post("/", protect, createEvent);

router.get("/", getAllEvents);
router.get("/my-events", protect, getMyEvents);
router.get("/:id", getEventById);

export default router;
