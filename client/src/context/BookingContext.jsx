import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { API_BASE } from "../utils/api";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/events`);
      const result = await response.json();
      setEvents(result.events || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadInitialEvents() {
      try {
        const response = await fetch(`${API_BASE}/api/events`);
        const result = await response.json();
        if (isMounted) {
          setEvents(result.events || []);
        }
      } catch (error) {
        console.error(error);
      }
    }
    void loadInitialEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. THE GLOBAL STATE
  const [currentEvent, setCurrentEvent] = useState([]);

  // Start with empty cart!
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Helper function to add/remove a seat
  const toggleSeat = async (seatObj) => {
    setSelectedSeats((prev) => {
      const alreadyInCart = prev.some((s) => s.id === seatObj.id);
      if (alreadyInCart) {
        // If it exists in the latest state, remove it
        return prev.filter((s) => s.id !== seatObj.id);
      }
      return [...prev, seatObj];
    });
  };

  const [orderData, setOrderData] = useState(() => {
    const saved = sessionStorage.getItem("evently_completed_order");
    return saved ? JSON.parse(saved) : null;
  });

  const setCompletedOrder = (order) => {
    setOrderData(order);
    if (order) {
      sessionStorage.setItem("evently_completed_order", JSON.stringify(order));
    } else {
      sessionStorage.removeItem("evently_completed_order");
    }
  };

  const getEventById = (id) => events.find((e) => e.id === id);

  const contextValue = useMemo(
    () => ({
      events,
      currentEvent,
      setCurrentEvent,
      selectedSeats,
      setSelectedSeats,
      toggleSeat,
      completedOrder: orderData,
      setCompletedOrder,
      getEventById,
      fetchEvents,
    }),
    [events, currentEvent, selectedSeats, orderData],
  );

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
