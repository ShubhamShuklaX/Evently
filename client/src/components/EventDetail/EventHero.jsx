import { CalendarDays, Heart, MapPin, Share2, Star } from "lucide-react";

const EventHero = () => {
  return (
    <div className="relative h-[520px] w-full overflow-hidden">
      <img
        src="/venue.jpg"
        alt="Event venue"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />

      {/* Action buttons */}
      <div className="absolute top-8 right-30 flex items-center gap-3">
        <button
          type="button"
          aria-label="Save event"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
        >
          <Heart size={18} />
        </button>
        <button
          type="button"
          aria-label="Share event"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Hero content */}
      <div className="absolute bottom-12 left-30 right-30 text-white">
        <div className="flex items-center gap-3">
          <span className="bg-[#6365f1] text-xs font-semibold px-2.5 py-1 rounded-full">
            Concert
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <Star size={14} />
            4.9 (120 reviews)
          </span>
        </div>

        <h1 className="text-5xl font-extrabold uppercase leading-tight mt-4 max-w-4xl">
          Galactic Symphony: A Night of Modern Classics
        </h1>
        <p className="text-neutral-200 text-lg mt-3">
          Experience the universe through the lens of a world-class orchestra.
        </p>

        <div className="flex items-center gap-6 mt-6 text-sm font-medium">
          <span className="flex items-center gap-2">
            <CalendarDays size={18} className="text-indigo-300" />
            Saturday, November 18, 2024
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={18} className="text-indigo-300" />
            The Grand Atrium, New York
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventHero;
