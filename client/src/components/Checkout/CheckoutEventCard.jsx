import { CalendarDays, MapPin } from "lucide-react";

const CheckoutEventCard = () => {
  return (
    <div className="flex items-center gap-6 bg-white border border-neutral-200 rounded-2xl p-6">
      <img
        src="/checkout-event.jpg"
        alt="Midnight Sun Music Festival 2024"
        className="w-40 h-40 rounded-xl object-cover shrink-0"
      />

      <div>
        <div className="flex items-center gap-2">
          <span className="bg-[#EEF0FF] text-[#6365f1] text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
            Music Festival
          </span>
          <span className="bg-neutral-100 text-neutral-600 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
            Fast Selling
          </span>
        </div>

        <h1 className="text-3xl font-bold text-[#1D1F23] mt-3 leading-tight">
          Midnight Sun Music Festival 2024
        </h1>

        <div className="flex items-center gap-5 mt-3 text-sm text-neutral-600">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={15} className="text-[#6365f1]" />
            Oct 24, 2024 • 7:00 PM
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={15} className="text-[#6365f1]" />
            Central Park, New York, NY
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutEventCard;
