import { AlertCircle, Info } from "lucide-react";

const SeatBanner = ({ variant = "tip" }) => {
  if (variant === "conflict") {
    return (
      <div className="flex items-center justify-between bg-[#1D1F23] text-white rounded-xl px-5 py-4 shadow-lg shadow-black/10">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-indigo-400 mt-0.5 shrink-0" />
          <div>
            <p className="font-bold text-sm">Booking Conflict</p>
            <p className="text-sm text-neutral-300 mt-0.5">
              Seat{" "}
              <span className="font-mono font-semibold text-indigo-300">
                A15
              </span>{" "}
              was just booked by another user. Please select another seat.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-[#EEF0FF] border border-[#D8DAFF] rounded-xl px-4 py-3 text-sm text-[#6365f1]/80">
      <Info size={16} className="shrink-0" />
      <p>
        Tip: Try selecting{" "}
        <span className="font-semibold text-[#6365f1]">Row A, Seat 6</span> in
        the Premium Pit to simulate a booking conflict (Error A15) during
        confirmation.
      </p>
    </div>
  );
};

export default SeatBanner;
