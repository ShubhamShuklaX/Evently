import { prisma } from "../config/prisma.js";
import crypto from "node:crypto";

export const processCheckout = async (req, res) => {
  try {
    const { seatIds, totalPaid, idempotencyKey } = req.body;

    if (!seatIds || seatIds.length === 0)
      return res.status(404).json({ error: "Seat Id is required" });

    const exist = await prisma.order.findUnique({
      where: { idempotencyKey: idempotencyKey },
    });

    if (exist) {
      return res.status(200).json({ success: true, order: exist });
    }

    const holdCount = await prisma.seat.count({
      where: {
        id: { in: seatIds },
        userId: req.user.id,
        status: "held",
        expiresAt: { gt: new Date() },
      },
    });
    if (holdCount !== seatIds.length) {
      return res.status(400).json({
        error: "Your seat hold has expired. Please select your seats again",
      });
    }

    const orderId = crypto.randomUUID();

    const result = await prisma.$transaction([
      prisma.order.create({
        data: {
          id: orderId,
          totalPaid,
          idempotencyKey,
          userId: req.user.id,
        },
      }),
      prisma.seat.updateMany({
        where: {
          id: { in: seatIds },
          userId: req.user.id,
          status: "held",
        },
        data: {
          status: "booked",
          orderId,
          expiresAt: null,
        },
      }),
    ]);

    res.status(200).json({ success: true, order: result[0] });
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
