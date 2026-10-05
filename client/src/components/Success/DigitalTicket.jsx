import React from "react";
import { MapPin, CalendarDays } from "lucide-react";
import { useBooking } from "../../context/BookingContext";

const DigitalTicket = () => {
  const { completedOrder, currentEvent, selectedSeats } = useBooking();
  const event = completedOrder?.event || currentEvent;
  const seats = completedOrder?.seats || selectedSeats;

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-black/5 overflow-hidden flex flex-col">
      <div className="bg-[#6365f1] text-white p-8 relative">
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#F6F7F9] rounded-full"></div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#F6F7F9] rounded-full"></div>

        <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4 inline-block">
          Official Ticket
        </span>

        <h2 className="text-3xl font-extrabold mb-3 tracking-tight">
          {event.title}
        </h2>

        <div className="flex items-center gap-5 text-indigo-100 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={16} /> {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={16} /> {event?.location || "Location TBA"}
          </span>
        </div>
      </div>

      <div className="p-8 flex justify-center items-stretch border-b border-neutral-200 border-dashed overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-thin">
        {seats.map((seat, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className="w-px border-l-2 border-dashed border-neutral-200 shrink-0 mx-6 sm:mx-8"></div>
            )}

            <div className="flex flex-col items-center relative z-10 shrink-0 w-48 sm:w-56 snap-center">
              <div className="w-full flex justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">
                <span>
                  Ticket 0{index + 1} of 0{seats.length}
                </span>
                <span>GA Admission</span>
              </div>

              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TKT-${seat.row}-${seat.col}`}
                alt="QR Code"
                className="w-32 h-32 mb-6"
              />

              <div className="w-full grid grid-cols-3 text-center divide-x divide-neutral-200">
                <div>
                  <p className="text-[9px] text-neutral-400 font-bold uppercase mb-1">
                    Section
                  </p>
                  <p className="font-bold text-[#1D1F23]">{seat.section}</p>
                </div>
                <div>
                  <p className="text-[9px] text-neutral-400 font-bold uppercase mb-1">
                    Row
                  </p>
                  <p className="font-bold text-[#1D1F23]">{seat.row}</p>
                </div>
                <div>
                  <p className="text-[9px] text-neutral-400 font-bold uppercase mb-1">
                    Seat
                  </p>
                  <p className="font-bold text-[#1D1F23]">{seat.seat}</p>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DigitalTicket;
