import { prisma } from "../config/prisma.js";
import crypto from "node:crypto";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const returnExistingOrder = (order, userId, requestedSeatIds, res) => {
  if (order.userId !== userId) {
    return res
      .status(403)
      .json({ error: "Idempotency key belongs to another user" });
  }

  const existingSeatIds = order.seats?.map((s) => s.id) || [];
  const isSameCount = existingSeatIds.length === requestedSeatIds.length;
  const isSameSeats = requestedSeatIds.every((id) =>
    existingSeatIds.includes(id),
  );

  if (!isSameCount || !isSameSeats) {
    return res.status(409).json({
      error:
        "Idempotency key has already been used for a different booking intent",
    });
  }

  return res.status(200).json({ success: true, order });
};

const validateHoldSeats = (holdSeats, expectedCount) => {
  if (holdSeats.length !== expectedCount) {
    return "Your seat hold has expired. Please select your seats again";
  }
  const firstEventId = holdSeats[0].eventId;
  if (!holdSeats.every((seat) => seat.eventId === firstEventId)) {
    return "All seats must be from the same events";
  }
  if (holdSeats[0].event.status !== "Live") {
    return `Cannot book seats for an event that is ${holdSeats[0].event.status.toLowerCase()}`;
  }
  return null;
};

const verifyPayment = async (paymentIntentId) => {
  if (!paymentIntentId || !stripe) return true;
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return intent.status === "succeeded";
};

const validateCheckoutInputs = (idempotencyKey, seatIds) => {
  if (!idempotencyKey) return "Idempotency key is required";
  if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
    return "A valid array of seat IDs is required";
  }
  const unique = [...new Set(seatIds)];
  if (unique.length > 10) {
    return "You can only book up to 10 seats per transaction";
  }
  return null;
};

const calculateCouponDiscount = (coupon, subtotal) => {
  if (!coupon || !coupon.active) return 0;
  if (coupon.maxUses && coupon.used >= coupon.maxUses) return 0;
  if (coupon.type === "percentage") {
    return Math.round((subtotal * coupon.discount) / 100);
  }
  return Math.min(subtotal, coupon.discount);
};

export const processCheckout = async (req, res) => {
  const { seatIds, idempotencyKey, paymentIntentId, couponCode } = req.body;
  const uniqueSeatIds = [...new Set(seatIds || [])];

  try {
    const inputError = validateCheckoutInputs(idempotencyKey, seatIds);
    if (inputError) {
      return res.status(400).json({ error: inputError });
    }

    const isPaid = await verifyPayment(paymentIntentId);
    if (!isPaid) {
      return res.status(400).json({ error: "Payment verification failed" });
    }

    const exist = await prisma.order.findUnique({
      where: { idempotencyKey },
      include: { seats: true },
    });

    if (exist) {
      return returnExistingOrder(exist, req.user.id, uniqueSeatIds, res);
    }

    const holdSeats = await prisma.seat.findMany({
      where: {
        id: { in: uniqueSeatIds },
        userId: req.user.id,
        status: "held",
        expiresAt: { gt: new Date() },
      },
      include: {
        event: true,
      },
    });

    const holdError = validateHoldSeats(holdSeats, uniqueSeatIds.length);
    if (holdError) {
      return res.status(400).json({ error: holdError });
    }

    const ticketPrice = holdSeats[0].event.price;
    const subtotal = ticketPrice * holdSeats.length;

    let discountAmount = 0;
    let appliedCoupon = null;
    if (couponCode && typeof couponCode === "string") {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });
      if (
        coupon &&
        coupon.active &&
        (!coupon.maxUses || coupon.used < coupon.maxUses)
      ) {
        appliedCoupon = coupon;
        discountAmount = calculateCouponDiscount(coupon, subtotal);
      }
    }

    const serverTotalPrice = Math.max(0, subtotal - discountAmount + 19);

    const orderId = crypto.randomUUID();

    const order = await prisma.$transaction(
      async (tx) => {
        // 1. Create order FIRST to satisfy foreign key constraint on seat.orderId
        const newOrder = await tx.order.create({
          data: {
            id: orderId,
            totalPaid: serverTotalPrice,
            idempotencyKey,
            userId: req.user.id,
            status: "paid",
          },
        });

        // 2. Link held seats to the newly created order
        const updated = await tx.seat.updateMany({
          where: {
            id: { in: uniqueSeatIds },
            userId: req.user.id,
            status: "held",
            expiresAt: { gt: new Date() },
          },
          data: {
            status: "booked",
            orderId: newOrder.id,
            expiresAt: null,
          },
        });

        if (updated.count !== uniqueSeatIds.length) {
          throw new Error(
            "One or more seat holds expired before completing checkout",
          );
        }

        // 3. Increment coupon usage count if applied
        if (appliedCoupon) {
          await tx.coupon.update({
            where: { id: appliedCoupon.id },
            data: { used: { increment: 1 } },
          });
        }

        return newOrder;
      },
      {
        maxWait: 10000,
        timeout: 15000,
      },
    );

    res.status(200).json({ success: true, order: order });
  } catch (error) {
    console.error("Checkout error:", error);

    if (error.message.includes("expired")) {
      return res.status(400).json({ error: error.message });
    }

    if (error.code === "P2002") {
      const existingOrder = await prisma.order.findUnique({
        where: { idempotencyKey },
        include: { seats: true },
      });
      if (existingOrder) {
        return returnExistingOrder(
          existingOrder,
          req.user.id,
          uniqueSeatIds,

          res,
        );
      }
    }

    return res.status(500).json({ error: "Failed to process checkout" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const myOrders = await prisma.order.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        seats: {
          include: {
            event: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ myOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch my orders" });
  }
};

export const createPaymentIntent = async (req, res) => {
  try {
    const { seatIds, couponCode, paymentIntentId: existingIntentId } = req.body;
    if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
      return res.status(400).json({ error: "Seat IDs are required" });
    }

    const uniqueSeatIds = [...new Set(seatIds)];

    const holdSeats = await prisma.seat.findMany({
      where: {
        id: { in: uniqueSeatIds },
        userId: req.user.id,
        status: "held",
        expiresAt: { gt: new Date() },
      },
      include: { event: true },
    });

    const holdError = validateHoldSeats(holdSeats, uniqueSeatIds.length);
    if (holdError) {
      return res.status(400).json({ error: holdError });
    }

    const ticketPrice = holdSeats[0].event.price;
    const subtotal = ticketPrice * holdSeats.length;

    let discountAmount = 0;
    let appliedCoupon = null;
    if (couponCode && typeof couponCode === "string") {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });
      if (
        coupon &&
        coupon.active &&
        (!coupon.maxUses || coupon.used < coupon.maxUses)
      ) {
        appliedCoupon = coupon;
        discountAmount = calculateCouponDiscount(coupon, subtotal);
      }
    }

    const totalAmount = Math.max(0, subtotal - discountAmount + 19);

    if (!stripe) {
      return res.status(500).json({
        error:
          "Stripe is not configured. Please set STRIPE_SECRET_KEY in server/.env",
      });
    }

    let paymentIntent;
    if (existingIntentId && typeof existingIntentId === "string") {
      paymentIntent = await stripe.paymentIntents.update(existingIntentId, {
        amount: Math.round(totalAmount * 100),
        metadata: {
          userId: req.user.id,
          eventId: holdSeats[0].eventId,
          seatIds: uniqueSeatIds.join(","),
          couponCode: appliedCoupon?.code || "",
        },
      });
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100),
        currency: "inr",
        metadata: {
          userId: req.user.id,
          eventId: holdSeats[0].eventId,
          seatIds: uniqueSeatIds.join(","),
          couponCode: appliedCoupon?.code || "",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });
    }

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: totalAmount,
      discount: discountAmount,
      coupon: appliedCoupon
        ? {
            code: appliedCoupon.code,
            discount: appliedCoupon.discount,
            type: appliedCoupon.type,
          }
        : null,
    });
  } catch (error) {
    console.error("Create payment intent error:", error);
    return res
      .status(500)
      .json({ error: "Failed to initialize payment intent" });
  }
};
