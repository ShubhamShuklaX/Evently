import { CalendarDays, MapPin } from "lucide-react";

const SeatEventInfo = () => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-[#1D1F23]">
        Midnight Sun Music Festival
      </h1>
      <div className="flex items-center gap-4 mt-3 text-sm text-neutral-600">
        <span className="flex items-center gap-1.5">
          <CalendarDays size={15} />
          Oct 24, 2024
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={15} />
          Central Park, New York
        </span>
        <span className="bg-neutral-100 border border-neutral-200 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
          Venue Plan: A-Stage
        </span>
      </div>
    </div>
  );
};

export default SeatEventInfo;
