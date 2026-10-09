import { useBooking } from "@/context/BookingContext";
import { CalendarDays, MapPin } from "lucide-react";

const CheckoutEventCard = () => {
  const { currentEvent } = useBooking();
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 shadow-xs">
      <img
        src={
          currentEvent?.img ||
          "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?"
        }
        alt={currentEvent?.title || "Event banner"}
        className="w-full sm:w-36 md:w-40 h-44 sm:h-36 md:h-40 rounded-xl object-cover shrink-0"
      />

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="bg-[#EEF0FF] text-[#6365f1] text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
            {currentEvent?.category || "Event"}
          </span>
          <span className="bg-neutral-100 text-neutral-600 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
            {currentEvent?.status || "Live"}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1D1F23] mt-2.5 leading-tight">
          {currentEvent?.title || "Event Title"}
        </h1>

        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2.5 text-xs sm:text-sm text-neutral-600">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={15} className="text-[#6365f1] shrink-0" />
            <span>{currentEvent?.date || "TBA"} • {currentEvent?.time || "TBA"}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={15} className="text-[#6365f1] shrink-0" />
            <span className="truncate">{currentEvent?.location || "TBA"}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutEventCard;
