import { useNavigate, useParams } from "react-router-dom";
import { Ticket } from "lucide-react";

const BookingCard = ({ event }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="lg:sticky lg:top-24 flex flex-col gap-5">
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg shadow-black/5 p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
          Standard Entry
        </p>
        <p className="mt-2">
          <span className="text-3xl font-mono font-bold text-[#6365f1]">
            ₹{(event?.price || 0).toFixed(2)}
          </span>
          <span className="text-sm text-neutral-500">/ per person</span>
        </p>

        <div className="h-px bg-neutral-200 my-5" />

        <button
          onClick={() => navigate(`/events/${id}/seats`)}
          type="button"
          className="w-full h-13 mt-5 flex items-center justify-center gap-2 bg-linear-to-r from-[#6365f1] to-[#4338ca] hover:from-[#4f51e9] hover:to-[#3730a3] text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer active:scale-[0.98]"
        >
          <Ticket size={18} />
          Book Tickets
        </button>

        <p className="text-xs text-neutral-500 text-center mt-4 leading-relaxed">
          Secure booking powered by Evently
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
