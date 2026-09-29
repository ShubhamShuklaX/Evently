import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  BarChart3, 
  Tag, 
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/organizer' },
    { name: 'Events Management', icon: CalendarDays, path: '/organizer/events' },
    { name: 'Attendees', icon: Users, path: '/organizer/attendees' },
    { name: 'Sales Analytics', icon: BarChart3, path: '/organizer/analytics' },
    { name: 'Discount Codes', icon: Tag, path: '/organizer/discounts' },
    { name: 'Studio Settings', icon: Settings, path: '/organizer/settings' },
    { name: 'Help Center', icon: HelpCircle, path: '/organizer/help' },
  ];

  return (
    <div className="w-64 shrink-0 flex flex-col gap-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm flex items-center gap-4">
        <img 
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d" 
          alt="Jordan Sterling" 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-[#1D1F23] font-bold text-sm">Jordan Sterling</h3>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">Premium Partner</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/organizer'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                isActive 
                  ? 'bg-[#6365f1] text-white shadow-sm shadow-[#6365f1]/30' 
                  : 'text-neutral-500 hover:bg-neutral-100'
              }`
            }
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto"></div>

      {/* Pro Plan Widget */}
      <div className="bg-[#F0F2FF] rounded-2xl p-4 border border-[#E0E4FF]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#6365f1] font-bold text-xs">Pro Plan</span>
          <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full border border-neutral-200">Active</span>
        </div>
        <div className="w-full h-1.5 bg-[#DCE0FF] rounded-full overflow-hidden mb-2">
          <div className="h-full bg-[#6365f1] w-[78%] rounded-full"></div>
        </div>
        <p className="text-[11px] text-neutral-500">
          <strong className="text-neutral-800">7.8k / 10k</strong> attendees reached this month
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
