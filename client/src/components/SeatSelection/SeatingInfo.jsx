import { Info, ShieldCheck } from "lucide-react";

const SeatingInfo = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white border border-neutral-200 rounded-2xl p-6">
        <h3 className="flex items-center gap-2 font-semibold text-sm text-[#1D1F23]">
          <Info size={16} className="text-[#6365f1]" />
          Seating Policy
        </h3>
        <p className="text-sm text-neutral-500 leading-6 mt-3">
          Once selected, seats are held for 10 minutes. Please complete your
          transaction within this window to ensure your selection is confirmed.
          Groups larger than 6 may require special booking.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-6">
        <h3 className="flex items-center gap-2 font-semibold text-sm text-[#1D1F23]">
          <ShieldCheck size={16} className="text-emerald-600" />
          Safe Booking
        </h3>
        <p className="text-sm text-neutral-500 leading-6 mt-3">
          Our real-time engine ensures no double-bookings. All transactions are
          encrypted and secured. Official ticketing partner of the Evently
          Premium network.
        </p>
      </div>
    </div>
  );
};

export default SeatingInfo;
