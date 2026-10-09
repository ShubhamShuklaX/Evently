import { BadgeCheck } from "lucide-react";

const OrganizerCard = ({ organizer }) => {
  const name = organizer?.name || "Evently Verified Host";
  const email = organizer?.email || "contact@evently.com";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6365f1&color=fff&bold=true`;

  return (
    <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 shadow-xs">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <img
          src={avatarUrl}
          alt={name}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-xs shrink-0"
        />
        <div className="min-w-0">
          <h3 className="flex items-center gap-1.5 font-bold text-base sm:text-lg text-[#1D1F23]">
            <span className="truncate">{name}</span>
            <BadgeCheck size={18} className="text-[#6365f1] shrink-0" />
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 truncate">
            Official Event Host ∙ {email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizerCard;
