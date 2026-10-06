import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { API_BASE } from "../utils/api";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(() => {
    try {
      const saved = sessionStorage.getItem("evently_current_event");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orderData, setOrderData] = useState(() => {
    const saved = sessionStorage.getItem("evently_completed_order");
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedSeats, setSelectedSeats] = useState(() => {
    try {
      const saved = sessionStorage.getItem("evently_selected_seats");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (selectedSeats && selectedSeats.length > 0) {
        sessionStorage.setItem(
          "evently_selected_seats",
          JSON.stringify(selectedSeats)
        );
      } else {
        sessionStorage.removeItem("evently_selected_seats");
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedSeats]);

  useEffect(() => {
    try {
      if (currentEvent && currentEvent.id) {
        sessionStorage.setItem(
          "evently_current_event",
          JSON.stringify(currentEvent)
        );
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentEvent]);

  const fetchEvents = useCallback(async () => {
    try {
      setEventsLoading(true);
      const response = await fetch(`${API_BASE}/api/events`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || "Failed to fetch events");
      }
      setEvents(result.events || []);
      setEventsError(null);
    } catch (error) {
      console.error(error);
      setEventsError(error.message || "Failed to load events");
    } finally {
      setEventsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadInitialEvents() {
      try {
        setEventsLoading(true);
        const response = await fetch(`${API_BASE}/api/events`);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result?.message || "Failed to fetch events");
        }
        if (isMounted) {
          setEvents(result.events || []);
          setEventsError(null);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setEventsError(error.message || "Failed to load events");
        }
      } finally {
        if (isMounted) {
          setEventsLoading(false);
        }
      }
    }
    void loadInitialEvents();
    return () => {
      isMounted = false;
    };
  }, []);

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

  const setCompletedOrder = (order) => {
    setOrderData(order);
    if (order) {
      sessionStorage.setItem("evently_completed_order", JSON.stringify(order));
    } else {
      sessionStorage.removeItem("evently_completed_order");
    }
  };

  const getEventById = useCallback(
    (id) => events.find((e) => e.id === id),
    [events],
  );

  const contextValue = useMemo(
    () => ({
      events,
      eventsLoading,
      currentEvent,
      setCurrentEvent,
      selectedSeats,
      setSelectedSeats,
      toggleSeat,
      completedOrder: orderData,
      setCompletedOrder,
      getEventById,
      fetchEvents,
      eventsError,
    }),
    [
      events,
      eventsLoading,
      currentEvent,
      selectedSeats,
      orderData,
      getEventById,
      fetchEvents,
      eventsError,
    ],
  );

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () => useContext(BookingContext);
