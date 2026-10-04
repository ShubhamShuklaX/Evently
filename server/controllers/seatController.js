import { prisma } from "../config/prisma.js";

export const createSeats = async (newEvent, tx = prisma) => {
  const rowsLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const colsPerRow = Math.ceil(newEvent.capacity / rowsLetters.length);

  const seatsData = [];
  let seatsCreated = 0;

  for (const row of rowsLetters) {
    for (let col = 1; col <= colsPerRow; col++) {
      if (seatsCreated < newEvent.capacity) {
        seatsData.push({
          eventId: newEvent.id,
          row,
          col,
          status: "available",
        });
        seatsCreated++;
      }
    }
  }

  await tx.seat.createMany({
    data: seatsData,
  });
};

export const getEventSeats = async (req, res) => {
  try {
    const { eventId } = req.params;

    const seats = await prisma.seat.findMany({
      where: { eventId },
      select: {
        id: true,
        row: true,
        col: true,
        status: true,
      },
      orderBy: [
        {
          row: "asc",
        },
        {
          col: "asc",
        },
      ],
    });

    res.status(200).json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event seats" });
  }
};

export const holdSeat = async (req, res) => {
  try {
    const seatIds =
      req.body.seatIds || (req.body.seatId ? [req.body.seatId] : []);
    if (!seatIds || seatIds.length === 0) {
      return res.status(400).json({ error: "Seat IDs are required" });
    }

    const expireTime = new Date(Date.now() + 10 * 60 * 1000);

    const seat = await prisma.$transaction(async (tx) => {
      const result = await tx.seat.updateMany({
        where: {
          id: { in: seatIds },
          event: { status: "Live" },
          OR: [
            { status: "available" },
            {
              status: "held",
              expiresAt: { lt: new Date() },
            },
          ],
        },
        data: { expiresAt: expireTime, userId: req.user.id, status: "held" },
      });

      if (result.count !== seatIds.length) {
        throw new Error("SEATS_UNAVAILABLE");
      }

      return result;
    });

    return res.status(200).json({
      message: "Successfully held seats",
      count: seat.count,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "SEATS_UNAVAILABLE") {
      return res.status(409).json({
        error: "One or more seats are no longer available",
      });
    }

    return res.status(500).json({
      error: "Failed to hold seat",
    });
  }
};

export const releaseSeats = async (req, res) => {
  try {
    const { seatIds } = req.body;

    if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
      return res
        .status(400)
        .json({ error: "A valid array of seat IDs is required" });
    }

    const uniqueSeatIds = [...new Set(seatIds)];

    const releasedSeats = await prisma.seat.updateMany({
      where: {
        id: { in: uniqueSeatIds },
        status: "held",
        userId: req.user.id,
      },
      data: {
        status: "available",
        userId: null,
        expiresAt: null,
      },
    });

    res.status(200).json({
      message: "Successfuly released seats",
      releasedCount: releasedSeats.count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to release seats" });
  }
};
