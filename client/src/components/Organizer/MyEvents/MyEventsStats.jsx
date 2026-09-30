import { CalendarCheck, DollarSign, Ticket, TrendingUp } from "lucide-react";

// Hardcoded stat cards. Each has its own icon/color pairing so they're easy
// to scan at a glance - swap `value` for real numbers once data is wired up.
const stats = [
  {
    label: "Live Events",
    value: "6",
    icon: CalendarCheck,
    style: "bg-[#EEF0FF] text-[#6365f1]",
  },
  {
    label: "Tickets Sold",
    value: "3,204",
    icon: Ticket,
    style: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Total Revenue",
    value: "$84,920",
    icon: DollarSign,
    style: "bg-amber-50 text-amber-600",
  },
  {
    label: "Avg. Sell-Through",
    value: "78%",
    icon: TrendingUp,
    style: "bg-rose-50 text-rose-600",
  },
];

const MyEventsStats = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {stats.map(({ label, value, icon: Icon, style }) => (
        <div
          key={label}
          className="bg-white border border-neutral-200 rounded-2xl p-5 flex items-center gap-4"
        >
          <span
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${style}`}
          >
            <Icon size={20} />
          </span>
          <div>
            <p className="text-xl font-bold text-[#1D1F23]">{value}</p>
            <p className="text-xs text-neutral-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEventsStats;
