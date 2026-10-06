import { Router } from "express";
import { authorizedRole, protect } from "../middleware/authMiddleware.js";
import {
  createCoupons,
  deleteCoupons,
  getMyCoupons,
  updateCoupons,
  validateCoupon,
} from "../controllers/couponController.js";
import { ROLES } from "../config/roles.js";

const router = Router();

router.post("/validate", protect, validateCoupon);

router.post(
  "/",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),
  createCoupons,
);
router.put(
  "/:id",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),
  updateCoupons,
);
router.get(
  "/",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),
  getMyCoupons,
);
router.delete(
  "/:id",
  protect,
  authorizedRole(ROLES.ADMIN, ROLES.ORGANIZER),
  deleteCoupons,
);

export default router;
