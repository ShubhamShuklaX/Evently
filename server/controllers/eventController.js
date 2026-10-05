import { prisma } from "../config/prisma.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../middleware/uploadMiddleware.js";
import { createSeats } from "./seatController.js";
import { ROLES } from "./../config/roles.js";

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
      status,
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

    // Validate required fields
    if (
      !title?.trim() ||
      !location?.trim() ||
      !category?.trim() ||
      !date ||
      !time ||
      !description?.trim() ||
      price === undefined ||
      price === ""
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!finalImageUrl) {
      return res
        .status(400)
        .json({ error: "Event banner image or image URL is required" });
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return res
        .status(400)
        .json({ error: "Price must be a valid positive number" });
    }

    const newEvent = await prisma.$transaction(async (tx) => {
      const event = await tx.event.create({
        data: {
          title,
          location,
          price: Number(parsedPrice),
          img: finalImageUrl,
          category,
          date,
          time,
          status: status || "Live",
          description,
          createdBy: req.user.id,
          capacity: eventCapacity,
        },
      });

      await createSeats(event, tx);
      return event;
    }, {
      maxWait: 10000,
      timeout: 15000,
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
    const events = await prisma.event.findMany({
      where: {
        status: "Live",
      },
      orderBy: { createdAt: "desc" },
    });
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const eventID = req.params.id;
    const event = await prisma.event.findUnique({
      where: { id: eventID },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

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

export const updateEvent = async (req, res) => {
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
      status,
    } = req.body;
    const eventCapacity = Number(capacity ?? 100);

    if (!Number.isInteger(eventCapacity) || eventCapacity <= 0) {
      return res.status(400).json({
        error: "Capacity must be a positive integer",
      });
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return res
        .status(400)
        .json({ error: "Price must be a valid positive number" });
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: req.params.id },
    });

    if (!existingEvent) {
      return res.status(404).json({ error: "Event does not exist" });
    }

    if (
      existingEvent.createdBy !== req.user.id &&
      req.user.role !== ROLES.ADMIN
    ) {
      return res.status(403).json({ error: "Forbidden Access to event" });
    }

    let finalImageUrl = existingEvent.img;

    if (req.file) {
      finalImageUrl = await uploadToCloudinary(req.file.buffer);

      if (existingEvent.img) {
        await deleteFromCloudinary(existingEvent.img);
      }
    } else if (img) {
      finalImageUrl = img;
    }

    if (eventCapacity !== existingEvent.capacity) {
      const activeSeats = await prisma.seat.count({
        where: {
          eventId: req.params.id,
          status: { in: ["booked", "held"] },
        },
      });

      if (activeSeats > 0) {
        return res.status(400).json({
          error:
            "Cannot change seating capacity after tickets have already been held or booked.",
        });
      }
    }

    const updatedEvent = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        title,
        location,
        price: parsedPrice,
        capacity: eventCapacity,
        img: finalImageUrl,
        status,
        date,
        time,
        category,
        description,
      },
    });

    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update event" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(404).json({ error: "Event Id is required" });
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return res.status(404).json({ error: "Event does not exist" });
    }

    if (
      existingEvent.createdBy !== req.user.id &&
      req.user.role !== ROLES.ADMIN
    ) {
      return res.status(403).json({ error: "Forbidden Access to event" });
    }

    const bookedCount = await prisma.seat.count({
      where: { eventId, status: "booked" },
    });

    if (bookedCount > 0) {
      return res.status(400).json({
        error:
          "Cannot delete an event that already has confirmed attendee bookings. Change status to 'Past' instead.",
      });
    }
    if (existingEvent.img) {
      await deleteFromCloudinary(existingEvent.img);
    }

    await prisma.$transaction(async (tx) => {
      await tx.seat.deleteMany({
        where: { eventId },
      });
      await tx.event.delete({
        where: { id: eventId },
      });
    }, {
      maxWait: 10000,
      timeout: 15000,
    });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};
