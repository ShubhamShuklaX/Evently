import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import SeatBanner from "./../components/SeatSelection/SeatBanner";
import SeatEventInfo from "./../components/SeatSelection/SeatEventInfo";
import SeatMap from "./../components/SeatSelection/SeatMap";
import SeatingInfo from "./../components/SeatSelection/SeatingInfo";
import BookingSummary from "./../components/SeatSelection/BookingSummary";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import SeatSelectionBar from "./../components/SeatSelection/SeatSelectionBar";

const SeatSelection = () => {
  const { id } = useParams();
  const { currentEvent, setCurrentEvent, getEventById } = useBooking();

  // Restore currentEvent from URL if we reloaded or went back
  useEffect(() => {
    if (!currentEvent || !currentEvent.id) {
      const event = getEventById(id);
      if (event) setCurrentEvent(event);
    }
  }, [id, currentEvent, getEventById, setCurrentEvent]);

  return (
    <>
      <Header />
      <SeatSelectionBar />
      <div className="px-30 py-8 flex flex-col gap-8">
        <SeatBanner variant="tip" /> {/* or variant="conflict" */}
        <div className="grid grid-cols-[1fr_380px] gap-8 items-start">
          <div className="flex flex-col gap-8">
            <SeatEventInfo />
            <SeatMap />
            <SeatingInfo />
          </div>
          <BookingSummary />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SeatSelection;
