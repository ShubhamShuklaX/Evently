import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

export const createEvent = async (req, res) => {
  try {
    const { title, location, price, img, category, date, time, description } =
      req.body;
    await prisma.event.create({
      data: {
        title,
        location,
        price,
        img,
        category,
        date,
        time,
        description,
        createdBy: req.user.id,
      },
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
