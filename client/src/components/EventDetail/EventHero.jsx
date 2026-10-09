import { CalendarDays, Heart, MapPin, Share2, Star } from "lucide-react";

const EventHero = ({ event }) => {
  return (
    <div className="relative min-h-[420px] sm:min-h-[480px] lg:h-130 w-full overflow-hidden flex flex-col justify-end">
      <img
        src={
          event?.img ||
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
        }
        alt={event?.title || "Event Image"}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />

      {/* Floating Action Buttons */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 lg:right-8 z-20 flex items-center gap-2.5 sm:gap-3">
        <button
          type="button"
          aria-label="Save event"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
        >
          <Heart size={18} />
        </button>
        <button
          type="button"
          aria-label="Share event"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 pt-16 text-white">
        <div className="flex items-center gap-3">
          <span className="bg-[#6365f1] text-xs font-semibold px-2.5 py-1 rounded-full">
            {event.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            4.9 (120 reviews)
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-tight mt-3 sm:mt-4 max-w-4xl">
          {event.title}
        </h1>
        <p className="text-neutral-200 text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 max-w-2xl line-clamp-3 sm:line-clamp-none">
          {event.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 sm:mt-6 text-xs sm:text-sm font-medium">
          <span className="flex items-center gap-2">
            <CalendarDays size={18} className="text-indigo-300 shrink-0" />
            <span>{event.date}</span>
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={18} className="text-indigo-300 shrink-0" />
            <span>{event.location}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventHero;
