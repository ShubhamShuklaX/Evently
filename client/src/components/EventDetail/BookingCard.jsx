import { useNavigate, useParams } from "react-router-dom";
import { Minus, Plus, Ticket, Timer } from "lucide-react";
import { useBooking } from "../../context/BookingContext";

const BookingCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentEvent } = useBooking();
  return (
    <div className="sticky top-24 flex flex-col gap-5">
      {/* Booking card */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg shadow-black/5 p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
          Standard Entry
        </p>
        <p className="mt-2">
          <span className="text-3xl font-mono font-bold text-[#6365f1]">
            ${currentEvent?.pricePerTicket?.toFixed(2) || "0.00"}
          </span>{" "}
          <span className="text-sm text-neutral-500">/ per person</span>
        </p>

        <div className="h-px bg-neutral-200 my-5" />

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#1D1F23]">Quantity</span>
          <div className="flex items-center border border-neutral-300 rounded-lg">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="px-2.5 py-1.5 text-neutral-500 hover:text-[#1D1F23] cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-[#1D1F23]">
              1
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="px-2.5 py-1.5 text-neutral-500 hover:text-[#1D1F23] cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-neutral-500 mt-4">
          <span>Service Fee</span>
          <span>$12.50</span>
        </div>

        <div className="h-px bg-neutral-200 my-5" />

        <div className="flex items-center justify-between">
          <span className="font-bold text-[#1D1F23]">Total</span>
          <span className="font-bold text-lg text-[#1D1F23]">${((currentEvent?.pricePerTicket || 0) + 12.50).toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate(`/events/${id}/seats`)}
          type="button"
          className="w-full h-13 mt-5 flex items-center justify-center gap-2 bg-linear-to-r from-[#6365f1] to-[#4338ca] hover:from-[#4f51e9] hover:to-[#3730a3] text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer active:scale-[0.98]"
        >
          <Ticket size={18} />
          Book Tickets
        </button>

        <p className="text-xs text-neutral-500 text-center mt-4 leading-relaxed">
          No tickets? We've got you covered with a 100% money-back guarantee.
        </p>
      </div>

      {/* Limited availability notice */}
      <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5">
        <h4 className="flex items-center gap-2 font-semibold text-[#1D1F23]">
          <Timer size={16} />
          Limited Availability
        </h4>
        <p className="text-sm text-neutral-600 leading-relaxed mt-2">
          Seats are filling up fast for this performance. Only 12 tickets
          remaining in the Orchestra section.
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
