import React from "react";
import { CheckCircle2, MapPin, Clock, Mail } from "lucide-react";
import { useBooking } from "../../context/BookingContext";

const SuccessSummary = () => {
  const { completedOrder, currentEvent, selectedSeats } = useBooking();
  
  const event = completedOrder?.event || currentEvent;
  const seats = completedOrder?.seats || selectedSeats;
  const total = completedOrder?.totalPaid || (event.pricePerTicket * seats.length + 19);
  const ticketTotal = event.pricePerTicket * seats.length;

  return (
    <>
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-[#1D1F23] mb-1">Order Summary</h3>
        <p className="text-xs text-neutral-500 mb-6 font-mono">
          Transaction ID: EVT-{Math.floor(Math.random() * 10000000)}
        </p>

        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
          <img
            src={event.image}
            alt="Event"
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-bold text-[#1D1F23] text-sm">
              {event.title}
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              {event.date} • {event.time}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm mb-6 pb-6 border-b border-neutral-100">
          <div className="flex justify-between text-neutral-600">
            <span>Tickets ({seats.length})</span>
            <span className="font-mono font-medium text-[#1D1F23]">
              ${ticketTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Processing Fees</span>
            <span className="font-mono font-medium text-[#1D1F23]">$19.00</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-[#1D1F23] text-lg">Total Paid</span>
          <span className="font-bold font-mono text-[#6365f1] text-xl">
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs text-neutral-600">
          <span className="font-bold text-[#6365f1] block mb-1">
            NEED HELP?
          </span>
          If you have questions about your order, visit our{" "}
          <a
            href="#"
            className="font-semibold text-[#1D1F23] underline hover:text-[#6365f1]"
          >
            Help Center
          </a>{" "}
          or contact the organizer.
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-[#1D1F23] mb-5">
          Event Guidelines
        </h3>

        <ul className="flex flex-col gap-4">
          <li className="flex gap-3 text-sm text-neutral-600 leading-snug">
            <CheckCircle2 size={18} className="text-[#6365f1] shrink-0" />
            Digital or printed ticket required for entry.
          </li>
          <li className="flex gap-3 text-sm text-neutral-600 leading-snug">
            <MapPin size={18} className="text-[#6365f1] shrink-0" />
            Main entrance at 72nd Street & 5th Avenue.
          </li>
          <li className="flex gap-3 text-sm text-neutral-600 leading-snug">
            <Clock size={18} className="text-[#6365f1] shrink-0" />
            Doors open at 5:30 PM (90 mins early).
          </li>
          <li className="flex gap-3 text-sm text-neutral-600 leading-snug">
            <Mail size={18} className="text-[#6365f1] shrink-0" />
            Check your email for weather updates.
          </li>
        </ul>
      </div>
    </>
  );
};

export default SuccessSummary;
