import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const result = await response.json();
        setEvents(result.events);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvents();
  }, []);

  // 2. THE GLOBAL STATE
  const [currentEvent, setCurrentEvent] = useState([]);

  // Start with empty cart!
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Helper function to add/remove a seat
  const toggleSeat = async (seatObj) => {
    setSelectedSeats((prev) => {
      const alreadyInCart = prev.find((s) => s.id === seatObj.id);
      if (alreadyInCart) {
        // If it exists in the latest state, remove it
        return prev.filter((s) => s.id !== seatObj.id);
      }
      return [...prev, seatObj];
    });
  };

  const [completedOrder, setCompletedOrder] = useState(null);

  const getEventById = (id) => events.find((e) => e.id === id);

  return (
    <BookingContext.Provider
      value={{
        events: events,
        currentEvent,
        setCurrentEvent,
        selectedSeats,
        setSelectedSeats,
        toggleSeat,
        completedOrder,
        setCompletedOrder,
        getEventById,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
