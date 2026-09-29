import { BadgeCheck } from "lucide-react";

const OrganizerCard = () => {
  return (
    <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <img
          src="/organizer.jpg"
          alt="Starlight Productions"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="flex items-center gap-1.5 font-semibold text-lg text-[#1D1F23]">
            Starlight Productions
            <BadgeCheck size={18} className="text-[#6365f1]" />
          </h3>
          <p className="text-sm text-neutral-500">Official Event Host</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="border border-neutral-300 rounded-lg px-4 py-2 text-sm font-medium text-[#1D1F23] hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          Follow
        </button>
        <button
          type="button"
          className="border border-neutral-300 rounded-lg px-4 py-2 text-sm font-medium text-[#1D1F23] hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default OrganizerCard;
