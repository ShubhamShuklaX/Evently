import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const SeatSelectionBar = () => {
  const { id } = useParams();

  return (
    <div className="border-y border-neutral-200 bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            to={id ? `/events/${id}` : "/events"}
            className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 hover:text-[#1D1F23] transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>Back to Event Details</span>
          </Link>
          <div className="hidden sm:block w-px h-4 bg-neutral-300" />
          <span className="bg-[#EEF0FF] text-[#6365f1] text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
            Step 2 of 3
          </span>
          <span className="text-xs sm:text-sm font-semibold text-[#1D1F23]">
            Select Your Seats
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionBar;
