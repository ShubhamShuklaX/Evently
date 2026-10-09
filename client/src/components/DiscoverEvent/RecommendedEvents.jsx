import { ArrowRight } from "lucide-react";
import EventCard from "./../EventCard";
import { useBooking } from "../../context/BookingContext";

const RecommendedEvents = () => {
  const { events } = useBooking();
  return (
    <div className="border-t border-neutral-200 bg-white/40">
      <div className="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#1D1F23]">
            Handpicked for You
          </h2>
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm cursor-pointer bg-transparent text-indigo-600 hover:bg-[#4f51e9] active:scale-95 hover:text-white border-2 rounded-full transition ease-in-out w-fit">
            <span>View all recommendations</span>
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedEvents;
