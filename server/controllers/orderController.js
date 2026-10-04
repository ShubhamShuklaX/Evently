import { prisma } from "../config/prisma.js";
import crypto from "node:crypto";

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

export const processCheckout = async (req, res) => {
  const { seatIds, idempotencyKey } = req.body;
  let uniqueSeatIds = [];
  try {
    if (!idempotencyKey)
      return res.status(400).json({ error: "Idempotency key is required" });

    if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0)
      return res
        .status(400)
        .json({ error: "A valid array of seat IDs is required" });

    const exist = await prisma.order.findUnique({
      where: { idempotencyKey },
      include: { seats: true },
    });

    uniqueSeatIds = [...new Set(seatIds)];
    if (uniqueSeatIds.length > 10) {
      return res
        .status(400)
        .json({ error: "You can only book up to 10 seats per transaction" });
    }

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
    const serverTotalPrice = ticketPrice * holdSeats.length + 19;

    const orderId = crypto.randomUUID();

    const order = await prisma.$transaction(async (tx) => {
      const updated = await tx.seat.updateMany({
        where: {
          id: { in: uniqueSeatIds },
          userId: req.user.id,
          status: "held",
          expiresAt: { gt: new Date() },
        },
        data: {
          status: "booked",
          orderId,
          expiresAt: null,
        },
      });

      if (updated.count !== uniqueSeatIds.length) {
        throw new Error(
          "One or more seat holds expired before completing checkout",
        );
      }

      return await tx.order.create({
        data: {
          id: orderId,
          totalPaid: serverTotalPrice,
          idempotencyKey,
          userId: req.user.id,
        },
      });
    });

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
