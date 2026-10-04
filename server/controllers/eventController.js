import { prisma } from "../config/prisma.js";
import { uploadToCloudinary } from "../middleware/uploadMiddleware.js";
import { createSeats } from "./seatController.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      location,
      price,
      category,
      date,
      time,
      description,
      img,
      capacity,
    } = req.body;

    let finalImageUrl = img;

    if (req.file) {
      finalImageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const eventCapacity = Number(capacity ?? 100);

    if (!Number.isInteger(eventCapacity) || eventCapacity <= 0) {
      return res.status(400).json({
        error: "Capacity must be a positive integer",
      });
    }
    const newEvent = await prisma.$transaction(async (tx) => {
      const event = await tx.event.create({
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
          capacity: eventCapacity,
        },
      });

      await createSeats(event, tx);
      return event;
    });

    res
      .status(201)
      .json({ message: "Event successfully created", event: newEvent });
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

    res.json({ events: myEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetach myEvents" });
  }
};
