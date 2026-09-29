import { ChevronLeft, Clock } from "lucide-react";

const SeatSelectionBar = () => {
  return (
    <div className="border-y border-neutral-200 bg-[#F6F7F9]">
      <div className="px-30 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-neutral-600 hover:text-[#1D1F23] transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
            Back to Event Details
          </button>
          <div className="w-px h-5 bg-neutral-300" />
          <span className="bg-[#EEF0FF] text-[#6365f1] text-xs font-semibold px-3 py-1 rounded-full">
            Step 2 of 3
          </span>
          <span className="text-sm font-semibold text-[#1D1F23]">
            Select Your Seats
          </span>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg px-3 py-1.5 font-mono text-sm font-semibold">
          <Clock size={15} />
          09:52
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionBar;
