import { prisma } from "./../config/prisma.js";

export const createCoupons = async (req, res) => {
  try {
    const { code, discount, maxUses, type } = req.body;

    if (!code || !discount) {
      return res
        .status(400)
        .json({ error: "All fields  of coupon are required" });
    }

    const promocode = code.trim().toUpperCase();

    const couponCheck = await prisma.coupon.findUnique({
      where: {
        code: promocode,
      },
    });

    if (couponCheck) {
      return res.status(400).json({ error: "Coupon already exists" });
    }

    const createCoupon = await prisma.coupon.create({
      data: {
        code: promocode,
        discount: Number(discount),
        maxUses: Number(maxUses) || 50,

        createdBy: req.user.id,

        type: type || "percentage",
      },
    });

    res
      .status(201)
      .json({ message: "Successfully created coupon", coupon: createCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMyCoupons = async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany({
      where: { createdBy: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.json({ coupons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCoupons = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const { code, discount, maxUses, type, active } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Coupon ID is required" });
    }

    if (!code || !discount) {
      return res
        .status(400)
        .json({ error: "All fields of coupon are required" });
    }

    const promocode = code.trim().toUpperCase();

    const couponCheck = await prisma.coupon.findUnique({
      where: { id },
    });

    if (!couponCheck) {
      return res.status(404).json({ error: "Coupon doesn't exist" });
    }

    if (couponCheck.createdBy !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You do not own this coupon" });
    }

    const updateData = {
      code: promocode,
      discount: Number(discount),
      maxUses: Number(maxUses) || couponCheck.maxUses,
    };
    if (type) updateData.type = type;
    if (typeof active === "boolean") updateData.active = active;

    const updateCoupon = await prisma.coupon.update({
      where: { id },
      data: updateData,
    });

    res
      .status(200)
      .json({ message: "Successfully updated coupon", coupon: updateCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCoupons = async (req, res) => {
  try {
    const { id } = req.params;

    const couponCheck = await prisma.coupon.findUnique({
      where: { id },
    });

    if (!couponCheck) {
      return res.status(400).json({ error: "Coupon doesn't exist" });
    }

    if (couponCheck.createdBy !== req.user.id) {
      return res.status(400).json({ error: "Coupon acess is forbidden" });
    }

    await prisma.coupon.delete({ where: { id } });

    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Please provide a promo code" });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (!coupon?.active) {
      return res.status(404).json({ error: "Invalid or inactive promo code" });
    }

    if (coupon.maxUses && coupon.used >= coupon.maxUses) {
      return res
        .status(400)
        .json({ error: "This promo code has reached its maximum usage limit" });
    }

    res.json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discount: coupon.discount,
        type: coupon.type,
      },
    });
  } catch (error) {
    console.error("Validate coupon error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to validate coupon" });
  }
};
