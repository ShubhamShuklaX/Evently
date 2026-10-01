import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { uploadToCloudinary } from "../middleware/uploadMiddleware.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

export const createEvent = async (req, res) => {
  try {
    const { title, location, price, category, date, time, description, img } =
      req.body;

    let finalImageUrl = img;

    if (req.file) {
      finalImageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const newEvent = await prisma.event.create({
      data: {
        title,
        location,
        price: Number(price),
        img: finalImageUrl,
        category,
        date,
        time,
        description,
        createdBy: req.user.id,
      },
    });

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

    res.status(201).json("Event successfully created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const eventID = req.params.id;
    const event = await prisma.event.findUnique({ where: { id: eventID } });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const myEvents = await prisma.event.findMany({
      where: { createdBy: userId },
    });
    if (!myEvents) {
      return res.status(404).json({ error: "Failed to fetach myEvents" });
    }
    res.json({ events: myEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetach myEvents" });
  }
};
