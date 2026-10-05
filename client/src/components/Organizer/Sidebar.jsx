import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  BarChart3,
  Tag,
  Settings,
  HelpCircle,
} from "lucide-react";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("evently_user") || "null");
  const displayName = user?.name || "Organizer Partner";
  const displayEmail = user?.email || "organizer@evently.io";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6365f1&color=fff&bold=true`;

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/organizer" },
    {
      name: "Events Management",
      icon: CalendarDays,
      path: "/organizer/my-events",
    },
    { name: "Attendees", icon: Users, path: "/organizer/attendees" },
    { name: "Sales Analytics", icon: BarChart3, path: "/organizer/analytics" },
    { name: "Discount Codes", icon: Tag, path: "/organizer/discounts" },
    { name: "Studio Settings", icon: Settings, path: "/organizer/settings" },
    { name: "Help Center", icon: HelpCircle, path: "/organizer/help" },
  ];

  return (
    <aside className="w-64 shrink-0 flex flex-col gap-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-[#6365f1]/20"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-[#1D1F23] font-bold text-sm truncate">
            {displayName}
          </h3>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider truncate mt-0.5">
            {user?.role === "admin" ? "Master Admin" : "Verified Partner"}
          </p>
          <p className="text-[11px] text-neutral-400 truncate">
            {displayEmail}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/organizer"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                isActive
                  ? "bg-[#6365f1] text-white shadow-sm shadow-[#6365f1]/30 font-semibold"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto"></div>

      {/* Pro Plan Widget */}
      <div className="bg-[#F0F2FF] rounded-2xl p-4 border border-[#E0E4FF]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#6365f1] font-bold text-xs">Organizer Tier</span>
          <span className="text-[10px] font-bold bg-white text-[#6365f1] px-2 py-0.5 rounded-full border border-[#DCE0FF]">
            Verified
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#DCE0FF] rounded-full overflow-hidden mb-2">
          <div className="h-full bg-[#6365f1] w-[85%] rounded-full"></div>
        </div>
        <p className="text-[11px] text-neutral-500">
          <strong className="text-neutral-800">Unlimited</strong> event listings & seat map access
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
