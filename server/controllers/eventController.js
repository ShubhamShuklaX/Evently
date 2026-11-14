import { prisma } from "../config/prisma.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../middleware/uploadMiddleware.js";
import { createSeats } from "./seatController.js";
import { ROLES } from "./../config/roles.js";

export const createEvent = async (req, res) => {
  let newUploadedUrl = null;
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

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return res
        .status(400)
        .json({ error: "Price must be a valid positive number" });
    }

    let finalImageUrl = img;

    if (req.file) {
      newUploadedUrl = await uploadToCloudinary(req.file.buffer);
      finalImageUrl = newUploadedUrl;
    }

    if (!finalImageUrl) {
      return res
        .status(400)
        .json({ error: "Event banner image or image URL is required" });
    }

    const newEvent = await prisma.$transaction(
      async (tx) => {
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
      },
      {
        maxWait: 10000,
        timeout: 15000,
      },
    );

    res
      .status(201)
      .json({ message: "Event successfully created", event: newEvent });
  } catch (error) {
    if (newUploadedUrl) {
      try {
        await deleteFromCloudinary(newUploadedUrl);
      } catch (delErr) {
        console.error("Failed to clean up orphaned Cloudinary image:", delErr);
      }
    }
    console.error(error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { page, limit, category, search } = req.query;

    const where = {
      status: "Live",
    };

    if (category && category !== "All") {
      where.category = { equals: category, mode: "insensitive" };
    }

    if (search && typeof search === "string" && search.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: "insensitive" } },
        { location: { contains: search.trim(), mode: "insensitive" } },
        { description: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    // Paginated branch
    if (page || limit) {
      const parsedPage = Math.max(1, parseInt(page, 10) || 1);
      const parsedLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 12));
      const skip = (parsedPage - 1) * parsedLimit;

      const [events, total] = await Promise.all([
        prisma.event.findMany({
          where,
          skip,
          take: parsedLimit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.event.count({ where }),
      ]);

      const totalPages = Math.ceil(total / parsedLimit);

      return res.json({
        events,
        pagination: {
          total,
          page: parsedPage,
          totalPages,
          limit: parsedLimit,
        },
      });
    }

    // Unpaginated fallback for initial or simple client consumers
    const events = await prisma.event.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json({
      events,
      pagination: {
        total: events.length,
        page: 1,
        totalPages: 1,
        limit: events.length,
      },
    });
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
      include: {
        _count: {
          select: {
            seats: {
              where: { status: "booked" },
            },
          },
        },
      },
    });

    const formattedEvent = myEvents.map((event) => ({
      ...event,
      soldCount: event._count.seats,
    }));

    res.json({ events: formattedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch myEvents" });
  }
};

export const updateEvent = async (req, res) => {
  let newUploadedUrl = null;
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
      newUploadedUrl = await uploadToCloudinary(req.file.buffer);
      finalImageUrl = newUploadedUrl;
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
        if (newUploadedUrl) {
          try {
            await deleteFromCloudinary(newUploadedUrl);
          } catch (delErr) {
            console.error("Cleanup error:", delErr);
          }
        }
        return res.status(400).json({
          error:
            "Cannot change seating capacity after tickets have already been held or booked.",
        });
      }
    }

    // Update database FIRST
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

    // Delete old image ONLY after database update succeeds
    if (
      newUploadedUrl &&
      existingEvent.img &&
      existingEvent.img !== newUploadedUrl
    ) {
      try {
        await deleteFromCloudinary(existingEvent.img);
      } catch (delErr) {
        console.error("Failed to delete old image from Cloudinary:", delErr);
      }
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    if (newUploadedUrl) {
      try {
        await deleteFromCloudinary(newUploadedUrl);
      } catch (delErr) {
        console.error("Failed to delete uploaded image after DB error:", delErr);
      }
    }
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

    await prisma.$transaction(
      async (tx) => {
        await tx.seat.deleteMany({
          where: { eventId },
        });
        await tx.event.delete({
          where: { id: eventId },
        });
      },
      {
        maxWait: 10000,
        timeout: 15000,
      },
    );

    // Delete Cloudinary image ONLY after successful database deletion
    if (existingEvent.img) {
      try {
        await deleteFromCloudinary(existingEvent.img);
      } catch (delErr) {
        console.error(
          "Failed to delete Cloudinary image after event delete:",
          delErr,
        );
      }
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

export const getOrganizerAttendees = async (req, res) => {
  try {
    const eventFilter =
      req.user.role === ROLES.ADMIN ? {} : { createdBy: req.user.id };

    const bookedSeats = await prisma.seat.findMany({
      where: {
        status: "booked",
        event: eventFilter,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            time: true,
          },
        },
        order: {
          select: {
            id: true,
            createdAt: true,
            status: true,
          },
        },
      },
      orderBy: {
        event: {
          date: "asc",
        },
      },
    });

    const attendees = bookedSeats.map((seat) => ({
      id: `ATT-${seat.id.slice(0, 6).toUpperCase()}`,
      seatId: seat.id,
      name: seat.user?.name || "Guest Attendee",
      email: seat.user?.email || "guest@evently.io",
      event: seat.event?.title || "Event",
      eventId: seat.event?.id,
      seat: `Row ${seat.row} - Seat ${seat.col}`,
      status: "Confirmed",
      orderId: seat.orderId
        ? `EVT-${seat.orderId.slice(0, 8).toUpperCase()}`
        : "-",
      time: seat.order?.createdAt
        ? new Date(seat.order.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
    }));

    res.status(200).json({ attendees });
  } catch (error) {
    console.error("Get attendees error:", error);
    res.status(500).json({ error: "Failed to fetch attendees" });
  }
};
