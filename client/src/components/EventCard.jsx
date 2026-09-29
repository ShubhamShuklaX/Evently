import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ layout = "grid", event }) => {
  const isList = layout === "list";
  const navigate = useNavigate();

  // If there's no event prop, don't crash
  if (!event) return null;

  return (
    <div
      className={`bg-[#F6F7F9] rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] ${
        isList
          ? "w-full flex flex-row"
          : "w-[320px] shrink-0 h-95 flex flex-col"
      }`}
    >
      {/* Image */}
      <div className={`relative shrink-0 ${isList ? "w-[220px]" : ""}`}>
        <img
          className={
            isList ? "w-[220px] h-full object-cover" : "w-[320px] h-[213.325px] object-cover"
          }
          src={event.image}
          alt={event.title}
        />
        <h3 className="absolute top-4 left-3 bg-[#F6F7F9E6] px-2 opacity-90 text-xs flex items-center justify-center font-medium rounded-full h-5">
          Music
        </h3>
      </div>

      {/* Content */}
      <div
        className={
          isList
            ? "flex flex-1 items-center justify-between px-6 py-5 gap-6"
            : "flex flex-col gap-3 px-5 pt-3"
        }
      >
        <div className={isList ? "flex flex-col gap-2" : "flex flex-col gap-3"}>
          <h2 className="text-[#1D1F23FF] text-lg leading-6 font-semibold">
            {event.title}
          </h2>
          <div className="text-[#696D72FF] text-sm">
            <h3 className="flex items-center justify-start gap-2 pb-1">
              <CalendarDays
                color="#696D72FF"
                strokeWidth={1.7}
                className="w-4 h-4"
              />
              {event.date}
              <span>· {event.time}</span>
            </h3>
            <h3 className="flex items-center justify-start gap-2">
              <MapPin color="#696D72FF" strokeWidth={1.7} className="w-4 h-4" />
              {event.venue}
            </h3>
          </div>
        </div>

        <div
          className={
            isList
              ? "flex items-center gap-6 shrink-0"
              : "mt-auto flex items-center justify-between text-[#6366F1] pb-4"
          }
        >
          <h2 className="font-medium text-xs text-[#6366F1]">
            from <span className="text-lg font-bold">${event.pricePerTicket}</span>
          </h2>
          <button 
            onClick={() => navigate(`/events/${event.id}`)}
            className="flex items-center justify-center gap-1 bg-[#6365f1] text-[#F4F6FF] font-medium px-3 h-9 rounded-full cursor-pointer hover:bg-[#4f51e9] shrink-0"
          >
            <Ticket className="h-4.5 pt-0.5 shrink-0 w-5" strokeWidth={1.5} />
            <span className="text-sm">View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
