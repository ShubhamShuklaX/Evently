import { Router } from "express";
import { authorizedRole, protect } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
} from "../controllers/eventController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { ROLES } from "../config/roles.js";

const router = Router();

router.post(
  "/",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),
  upload.single("img"),
  createEvent,
);

router.get("/", getAllEvents);
router.get(
  "/my-events",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),

  getMyEvents,
);
router.get("/:id", getEventById);

export default router;
