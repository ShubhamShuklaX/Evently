import { CalendarDays, Clock, MapPin } from "lucide-react";

const EventInfoBar = ({ event }) => {
  const info = [
    { icon: CalendarDays, label: "Date", value: event?.date || "TBA" },
    { icon: Clock, label: "Time", value: event?.time || "TBA" },
    { icon: MapPin, label: "Location", value: event?.location || "TBA" },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 bg-white border border-neutral-200 rounded-2xl p-6">
      {info.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-full bg-[#EEF0FF] text-[#6365f1] flex items-center justify-center shrink-0">
            <Icon size={20} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              {label}
            </p>
            <p className="font-semibold text-[#1D1F23] leading-snug mt-0.5">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventInfoBar;
