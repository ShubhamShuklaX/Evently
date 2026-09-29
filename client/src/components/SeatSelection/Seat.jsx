import { Armchair, Clock, User } from "lucide-react";

const styles = {
  available:
    "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-300 cursor-pointer",
  selected:
    "bg-[#6365f1] border-[#6365f1] text-white shadow-md shadow-indigo-300 cursor-pointer",
  held: "bg-amber-50 border-amber-200 text-amber-500 cursor-not-allowed",
  booked:
    "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed",
};

const icons = {
  available: Armchair,
  selected: Armchair,
  held: Clock,
  booked: User,
};

const Seat = ({ status = "available", label, onClick }) => {
  const Icon = icons[status];
  const isLocked = status === "held" || status === "booked";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLocked}
      aria-label={`Seat ${label} (${status})`}
      title={label}
      className={`w-8 h-8 shrink-0 rounded-lg border flex items-center justify-center transition-colors ${styles[status]}`}
    >
      <Icon size={14} />
    </button>
  );
};

export default Seat;
