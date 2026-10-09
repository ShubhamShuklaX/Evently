import { ArrowRight, Loader2 } from "lucide-react";
import EventCard from "../EventCard";
import { Link } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";

const FeaturedEvents = () => {
  const { events, eventsLoading } = useBooking();
  return (
    <div className="w-full px-4 sm:px-8 lg:px-15 xl:px-25 py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold pb-1 text-neutral-900">
            Featured Events
          </h2>
          <h3 className="text-neutral-500 text-sm sm:text-base">
            Hand-picked experience you can't miss this season
          </h3>
        </div>
        <Link
          to="/events"
          className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm cursor-pointer bg-transparent text-indigo-600 hover:bg-[#4f51e9] hover:text-[#DFE1E4FF] border-2 rounded-full transition ease-in-out shrink-0 w-fit"
        >
          <span>Explore All</span>
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="flex no-scrollbar scroll-smooth gap-4 sm:gap-6 mt-6 sm:mt-8 overflow-x-auto pt-2 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {eventsLoading ? (
          <div className="w-full py-16 flex flex-col items-center justify-center gap-2">
            <Loader2 size={30} className="animate-spin text-[#6365f1]" />
            <p className="text-neutral-400 text-sm">Loading featured events...</p>
          </div>
        ) : (
          events.slice(0, 8).map((event) => (
            <div key={event.id} className="w-72 sm:w-80 shrink-0">
              <EventCard event={event} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedEvents;
