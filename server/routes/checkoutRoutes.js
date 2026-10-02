import { Router } from "express";
import { protect } from "./../middleware/authMiddleware.js";
import { processCheckout } from "./../controllers/checkoutController.js";

const router = Router();

router.post("/", protect, processCheckout);

export default router;
