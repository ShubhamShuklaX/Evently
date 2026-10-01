import { Router } from "express";
import { getEventSeats } from "../controllers/seatController.js";

const router = Router();

router.get("/:eventId", getEventSeats);

export default router;
