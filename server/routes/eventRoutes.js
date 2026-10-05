import { Router } from "express";
import { authorizedRole, protect } from "../middleware/authMiddleware.js";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  getOrganizerAttendees,
  updateEvent,
} from "../controllers/eventController.js";
import { upload, verifyImageSignature } from "../middleware/uploadMiddleware.js";
import { ROLES } from "../config/roles.js";

const router = Router();

router.post(
  "/",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),
  upload.single("img"),
  verifyImageSignature,
  createEvent,
);

router.get("/", getAllEvents);
router.get(
  "/my-events",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),

  getMyEvents,
);
router.get(
  "/organizer/attendees",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),
  getOrganizerAttendees,
);
router.get("/:id", getEventById);

router.put(
  "/:id",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),
  upload.single("img"),
  verifyImageSignature,
  updateEvent,
);

router.delete(
  "/:id",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),
  deleteEvent,
);

export default router;
