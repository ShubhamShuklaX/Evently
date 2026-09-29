import { ArrowRight } from "lucide-react";
import EventCard from "./../EventCard";
import { useBooking } from "../../context/BookingContext";

const RecommendedEvents = () => {
  const { events } = useBooking();
  return (
    <div className="px-30 py-16 border-t">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#1D1F23]">
          Handpicked for You
        </h2>
        <button className="flex items-center gap-1 px-2.5 text-[15px] py-2 cursor-pointer bg-transparent text-indigo-600 hover:bg-[#4f51e9] active:scale-95 hover:text-[#DFE1E4FF] border-2 rounded-full transition ease-in-out">
          View all recommendations
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="flex overflow-x-auto no-scrollbar px-2 py-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedEvents;
