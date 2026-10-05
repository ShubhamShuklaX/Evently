import { BadgeCheck } from "lucide-react";

const OrganizerCard = ({ organizer }) => {
  const name = organizer?.name || "Evently Verified Host";
  const email = organizer?.email || "contact@evently.com";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6365f1&color=fff&bold=true`;

  return (
    <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs">
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={name}
          className="w-14 h-14 rounded-full object-cover shadow-xs"
        />
        <div>
          <h3 className="flex items-center gap-1.5 font-bold text-lg text-[#1D1F23]">
            {name}
            <BadgeCheck size={18} className="text-[#6365f1]" />
          </h3>
          <p className="text-sm text-neutral-600">
            Official Event Host ∙ {email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizerCard;
