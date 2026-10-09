import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  BarChart3,
  Tag,
} from "lucide-react";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("evently_user") || "null");
  const displayName = user?.name || "Organizer";
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
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4 lg:gap-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200 shadow-xs flex items-center gap-3 sm:gap-4">
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-[#6365f1]/20 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-[#1D1F23] font-bold text-sm truncate">
            {displayName}
          </h3>
          <p className="text-[10px] font-bold text-[#6365f1] uppercase tracking-wider truncate mt-0.5">
            {user?.role === "admin" ? "Master Admin" : "Event Organizer"}
          </p>
          <p className="text-[11px] text-neutral-400 truncate">
            {displayEmail}
          </p>
        </div>
      </div>

      {/* Navigation - Horizontal scrollable tabs on mobile/tablet, vertical stack on desktop */}
      <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto no-scrollbar py-1 lg:py-0 -mx-1 px-1 lg:mx-0 lg:px-0">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/organizer"}
            className={({ isActive }) =>
              `flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-xl transition-all font-medium text-xs sm:text-sm shrink-0 whitespace-nowrap ${
                isActive
                  ? "bg-[#6365f1] text-white shadow-xs font-semibold"
                  : "text-neutral-600 bg-white lg:bg-transparent border border-neutral-200 lg:border-transparent hover:bg-neutral-100 hover:text-neutral-900"
              }`
            }
          >
            <item.icon size={16} className="shrink-0" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
