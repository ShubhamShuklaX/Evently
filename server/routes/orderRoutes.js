import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPaymentIntent,
  getMyOrders,
  processCheckout,
} from "./../controllers/orderController.js";

const router = Router();

router.post("/create-payment-intent", protect, createPaymentIntent);
router.post("/", protect, processCheckout);
router.get("/", protect, getMyOrders);

export default router;
