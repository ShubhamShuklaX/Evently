import { useBooking } from "@/context/BookingContext";
import { CalendarDays, MapPin } from "lucide-react";

const SeatEventInfo = () => {
  const { currentEvent } = useBooking();

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-[#1D1F23]">
        {currentEvent?.title || "Event Title"}
      </h1>
      <div className="flex items-center gap-4 mt-3 text-sm text-neutral-600">
        <span className="flex items-center gap-1.5">
          <CalendarDays size={15} />
          {currentEvent?.date || "TBA"}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={15} />
          {currentEvent?.location || "TBA"}
        </span>
        <span className="bg-neutral-100 border border-neutral-200 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
          {currentEvent?.category || "General"}
        </span>
      </div>
    </div>
  );
};

export default SeatEventInfo;
