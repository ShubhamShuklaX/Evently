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
    let rawSeatIds = req.body.seatIds;
    if (rawSeatIds === undefined && req.body.seatId) {
      rawSeatIds = [req.body.seatId];
    }

    if (!rawSeatIds || !Array.isArray(rawSeatIds) || rawSeatIds.length === 0) {
      return res
        .status(400)
        .json({ error: "A valid array of seat IDs is required" });
    }

    // Reject empty, null, or non-string IDs
    if (rawSeatIds.some((id) => !id || typeof id !== "string" || !id.trim())) {
      return res.status(400).json({ error: "Invalid seat ID provided" });
    }

    // Reject duplicate IDs
    const uniqueSeatIds = [...new Set(rawSeatIds)];
    if (uniqueSeatIds.length !== rawSeatIds.length) {
      return res
        .status(400)
        .json({ error: "Duplicate seat IDs are not allowed" });
    }

    // Enforce max 10 seats limit
    if (uniqueSeatIds.length > 10) {
      return res
        .status(400)
        .json({ error: "You can only hold up to 10 seats at a time" });
    }

    // Ensure all seats exist and belong to the same live event
    const seatsInDb = await prisma.seat.findMany({
      where: { id: { in: uniqueSeatIds } },
      select: {
        id: true,
        eventId: true,
        event: {
          select: { status: true },
        },
      },
    });

    if (seatsInDb.length !== uniqueSeatIds.length) {
      return res
        .status(404)
        .json({ error: "One or more requested seats do not exist" });
    }

    const targetEventId = seatsInDb[0].eventId;
    if (!seatsInDb.every((s) => s.eventId === targetEventId)) {
      return res
        .status(400)
        .json({ error: "All seats must belong to the same event" });
    }

    if (seatsInDb[0].event.status !== "Live") {
      return res
        .status(400)
        .json({ error: "Cannot hold seats for an event that is not live" });
    }

    const expireTime = new Date(Date.now() + 10 * 60 * 1000);

    const seat = await prisma.$transaction(
      async (tx) => {
        const result = await tx.seat.updateMany({
          where: {
            id: { in: uniqueSeatIds },
            event: { status: "Live" },
            OR: [
              { status: "available" },
              {
                status: "held",
                OR: [
                  { expiresAt: { lt: new Date() } },
                  { userId: req.user.id },
                ],
              },
            ],
          },
          data: { expiresAt: expireTime, userId: req.user.id, status: "held" },
        });

        if (result.count !== uniqueSeatIds.length) {
          throw new Error("SEATS_UNAVAILABLE");
        }

        return result;
      },
      {
        maxWait: 10000,
        timeout: 15000,
      },
    );

    return res.status(200).json({
      message: "Successfully held seats",
      count: seat.count,
    });
  } catch (error) {
    console.error("Hold seats error:", error);

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
