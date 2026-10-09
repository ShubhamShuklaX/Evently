import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { API_BASE } from "../utils/api";
import SeatEventInfo from "./../components/SeatSelection/SeatEventInfo";
import SeatMap from "./../components/SeatSelection/SeatMap";
import SeatingInfo from "./../components/SeatSelection/SeatingInfo";
import BookingSummary from "./../components/SeatSelection/BookingSummary";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import SeatSelectionBar from "./../components/SeatSelection/SeatSelectionBar";
import LoadingSpinner from "../components/LoadingSpinner";

const SeatSelection = () => {
  const { id } = useParams();
  const { currentEvent, setCurrentEvent, getEventById, setSelectedSeats } =
    useBooking();

  const activeEvent = currentEvent?.id === id ? currentEvent : getEventById(id);

  // Keep currentEvent in sync with the route ID and reset cart if event changed
  useEffect(() => {
    if (!id) return;

    // If navigating to a different event, clear old seats and check cache
    if (currentEvent?.id !== id) {
      setSelectedSeats([]);
      const cached = getEventById(id);
      if (cached) {
        setCurrentEvent(cached);
      }
    }

    // Always fetch fresh event details from API
    let isMounted = true;
    async function loadEvent() {
      try {
        const res = await fetch(`${API_BASE}/api/events/${id}`);
        const data = await res.json();
        if (isMounted && data.event) {
          setCurrentEvent(data.event);
        }
      } catch (err) {
        console.error("Failed to load event for seat selection:", err);
      }
    }

    void loadEvent();

    return () => {
      isMounted = false;
    };
  }, [id, currentEvent?.id, getEventById, setCurrentEvent, setSelectedSeats]);

  if (!activeEvent) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner
            message="Loading interactive seating map..."
            fullScreen={false}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9]">
      <Header />
      <SeatSelectionBar />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="flex flex-col gap-6 sm:gap-8 min-w-0">
            <SeatEventInfo />
            <SeatMap />
            <SeatingInfo />
          </div>
          <div className="w-full">
            <BookingSummary />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SeatSelection;
