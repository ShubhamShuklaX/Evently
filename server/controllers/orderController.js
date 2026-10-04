import { prisma } from "../config/prisma.js";
import crypto from "node:crypto";

export const processCheckout = async (req, res) => {
  try {
    const { seatIds, idempotencyKey } = req.body;

    if (!idempotencyKey)
      return res.status(400).json({ error: "Idempotency key is required" });

    if (!seatIds || seatIds.length === 0)
      return res.status(404).json({ error: "Seat Id is required" });

    const exist = await prisma.order.findUnique({
      where: { idempotencyKey: idempotencyKey },
    });

    if (exist) {
      if (exist.userId !== req.user.id) {
        return res
          .status(403)
          .json({ error: "Idempotency key belongs to another user" });
      }
      return res.status(200).json({ success: true, order: exist });
    }

    const holdSeats = await prisma.seat.findMany({
      where: {
        id: { in: seatIds },
        userId: req.user.id,
        status: "held",
        expiresAt: { gt: new Date() },
      },
      include: {
        event: true,
      },
    });
    if (holdSeats.length !== seatIds.length) {
      return res.status(400).json({
        error: "Your seat hold has expired. Please select your seats again",
      });
    }

    const firstEventId = holdSeats[0].eventId;
    const allSameEvents = holdSeats.every(
      (seat) => seat.eventId === firstEventId,
    );
    if (!allSameEvents) {
      return res
        .status(400)
        .json({ error: "All seats must be from the same events" });
    }

    const ticketPrice = holdSeats[0].event.price;
    const serverTotalPrice = ticketPrice * holdSeats.length + 19;

    const orderId = crypto.randomUUID();

    const order = await prisma.$transaction(async (tx) => {
      const updated = await tx.seat.updateMany({
        where: {
          id: { in: seatIds },
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

      if (updated.count !== seatIds.length) {
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
    console.error(error);
    res.status(500).json({ error: error.message });
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
