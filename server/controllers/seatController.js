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

    res.status(201).json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event seats" });
  }
};
