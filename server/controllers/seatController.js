import { prisma } from "../config/prisma.js";

export const createSeats = async (newEvent) => {
  const rowsLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const colsPerRow = Math.ceil(newEvent.capacity / rowsLetters.length);

  const seatsData = [];
  let seatsCreated = 0;

  for (const row of rowsLetters) {
    for (let col = 1; col <= colsPerRow; col++) {
      if (seatsCreated < newEvent.capacity) {
        seatsData.push({
          eventId: newEvent.id,
          row: row,
          col: col,
          status: "available",
        });
        seatsCreated++;
      }
    }
  }

  await prisma.seat.createMany({
    data: seatsData,
  });
};

export const getEventSeats = async (req, res) => {
  try {
    const { eventId } = req.params;

    const seats = await prisma.seat.findMany({
      where: { eventId: eventId },
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

export const bookSeat = async (req, res) => {
  try {
    const { seatId } = req.body;

    if (!seatId) {
      return res.status(400).json({
        error: "Seat ID is required",
      });
    }

    const result = await prisma.seat.updateMany({
      where: { id: seatId, status: "available" },
      data: { userId: req.user.id, status: "booked" },
    });

    if (result.count === 0) {
      throw new Error("Seat is no longer available");
    }

    res.status(200).json({ message: "Seat booked successfully!" });
  } catch (error) {
    console.error(error);
    if (error.message === "Seat is no longer available") {
      return res.status(400).json({ error: "Seat is already booked!" });
    }
    res.status(500).json({
      error: "Booking failed",
      details: error.message,
      stack: error.stack,
    });
  }
};

export const holdSeat = async (req, res) => {
  try {
    const { seatId } = req.body;

    if (!seatId) return res.status(404).json({ error: "Seat Id is required" });

    const expireTime = new Date(Date.now() + 10 * 60 * 1000);

    const result = await prisma.seat.updateMany({
      where: { id: seatId, status: "available" },
      data: { expiresAt: expireTime, userId: req.user.id, status: "held" },
    });

    if (result.count === 0) {
      return res.status(404).json({ error: "Seat is no longer available" });
    }
    res.status(200).json("Successfully hold seat");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to hold seat" });
  }
};
