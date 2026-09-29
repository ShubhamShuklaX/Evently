import React, { createContext, useContext, useState } from "react";
import img1 from "../assets/7b99fda3-8fb3-4566-aaaa-198850298360.webp";
import img2 from "../assets/7cd4cbd7-d18a-44e7-927d-ddc166223295.webp";

const BookingContext = createContext();

// 1. FAKE DATABASE
const MOCK_EVENTS = [
  {
    id: "evt-123",
    title: "Midnight Sun Music Festival 2024",
    date: "Oct 24, 2024",
    time: "7:00 PM",
    venue: "Great Lawn Main Stage",
    pricePerTicket: 75.0,
    image: img1,
    category: "Music",
  },
  {
    id: "evt-456",
    title: "SOMA Electronic Expo",
    date: "Nov 12, 2024",
    time: "9:00 PM",
    venue: "Brooklyn Navy Yard",
    pricePerTicket: 65.0,
    image: img2,
    category: "Tech",
  },
];

export const BookingProvider = ({ children }) => {
  // 2. THE GLOBAL STATE
  // We initialize these with dummy data so your checkout page doesn't break right away!
  const [currentEvent, setCurrentEvent] = useState(MOCK_EVENTS[0]);

  // Start with empty cart!
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Helper function to add/remove a seat
  const toggleSeat = (seatObj) => {
    setSelectedSeats((prev) => {
      // Check if seat already exists in cart
      const exists = prev.find(
        (s) => s.section === seatObj.section && s.row === seatObj.row && s.seat === seatObj.seat
      );
      if (exists) {
        // Remove it if it exists (Toggle OFF)
        return prev.filter(
          (s) => !(s.section === seatObj.section && s.row === seatObj.row && s.seat === seatObj.seat)
        );
      }
      // Add it if it doesn't exist (Toggle ON)
      return [...prev, seatObj];
    });
  };

  // The final order data (populated after checkout)
  const [completedOrder, setCompletedOrder] = useState(null);

  const getEventById = (id) => MOCK_EVENTS.find((e) => e.id === id);

  return (
    <BookingContext.Provider
      value={{
        events: MOCK_EVENTS,
        currentEvent,
        setCurrentEvent,
        selectedSeats,
        setSelectedSeats,
        toggleSeat, // EXPORT THIS TOO!
        completedOrder,
        setCompletedOrder,
        getEventById,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook so you can just type `const { currentEvent } = useBooking()` anywhere!
export const useBooking = () => useContext(BookingContext);
