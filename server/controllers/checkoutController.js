import { prisma } from "./../config/prisma.js";

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

    const result = await prisma.$transaction([
      prisma.seat.updateMany({
        where: {
          id: { in: seatIds },
          userId: req.user.id,
          status: "held",
        },
        data: {
          status: "booked",
          expiresAt: null,
        },
      }),
      prisma.order.create({
        data: {
          totalPaid,
          idempotencyKey,
          userId: req.user.id,
        },
      }),
    ]);

    res.status(200).json({ success: true, order: result[1] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "" });
  }
};
