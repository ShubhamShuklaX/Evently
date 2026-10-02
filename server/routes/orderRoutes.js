import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyOrders,
  processCheckout,
} from "./../controllers/orderController.js";

const router = Router();

router.post("/", protect, processCheckout);
router.get("/", protect, getMyOrders);

export default router;
