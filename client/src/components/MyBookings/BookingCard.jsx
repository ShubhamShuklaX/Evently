import React from "react";
import {
  CalendarDays,
  MapPin,
  Ticket,
  MoreVertical,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();
  const { setCompletedOrder } = useBooking();

  const { event, seats, totalPaid, status, orderId } = booking;
  const isUpcoming = status === "upcoming";
  const isPending = status === "pending";

  let seatSummary = "General Admission";
  if (seats && seats.length > 0) {
    const extra = seats.length > 1 ? ` (+${seats.length - 1})` : "";
    seatSummary = `Sec ${seats[0].section}, Row ${seats[0].row}, Seat ${seats[0].seat}${extra}`;
  }

  return (
    <div className="flex flex-col md:flex-row bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Left: Image */}
      <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 bg-neutral-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full absolute inset-0 object-cover object-top"
        />

        <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-[#1D1F23] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {event.category || "Music"}
        </span>
      </div>

      {/* Right: Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-3 mb-2">
            {isUpcoming && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#6365f1] bg-indigo-50 px-2.5 py-1 rounded-md">
                <Ticket size={14} /> Upcoming
              </span>
            )}
            {isPending && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                <AlertCircle size={14} /> Payment Pending
              </span>
            )}
            <span className="text-xs font-mono text-neutral-400">
              {orderId}
            </span>
          </div>
          <button className="text-neutral-400 hover:text-[#1D1F23] transition-colors cursor-pointer p-1">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#1D1F23] mb-4">{event.title}</h3>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <CalendarDays size={16} className="text-[#6365f1]" />
            {event.date} • {event.time}
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <MapPin size={16} className="text-[#6365f1]" />
            {event.venue}
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Ticket size={16} className="text-[#6365f1]" />
            {seatSummary}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1D1F23]">
            ₹{totalPaid.toFixed(2)}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col sm:flex-row gap-3">
          {isPending ? (
            <>
              <button className="flex-1 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm">
                Retry Payment <ArrowRight size={16} />
              </button>
              <button className="flex-1 bg-white border border-neutral-200 hover:bg-neutral-50 text-[#1D1F23] font-semibold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm">
                Discard Order
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setCompletedOrder(booking);
                  void navigate(
                    `/events/${event.id || "ticket"}/seats/success`,
                  );
                }}
                className="flex-1 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                <Ticket size={16} /> View Ticket
              </button>
              <button
                onClick={() =>
                  void navigate(event.id ? `/events/${event.id}` : "/events")
                }
                className="flex-1 bg-white border border-neutral-200 hover:bg-neutral-50 text-[#1D1F23] font-semibold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                View Event Details <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
