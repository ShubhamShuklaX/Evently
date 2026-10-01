import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
} from "../controllers/eventController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = Router();

router.post("/", protect, upload.single("img"), createEvent);

router.get("/", getAllEvents);
router.get("/my-events", protect, getMyEvents);
router.get("/:id", getEventById);

export default router;
