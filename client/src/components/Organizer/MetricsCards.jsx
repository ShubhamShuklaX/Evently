import React from 'react';
import { TrendingUp, Ticket, Calendar, Users, ArrowUpRight } from 'lucide-react';

const MetricsCards = () => {
  const metrics = [
    {
      title: "TOTAL REVENUE",
      value: "$220,370",
      change: "12.5%",
      isPositive: true,
      icon: TrendingUp,
      subtitle: "Lifetime earnings across all events"
    },
    {
      title: "TICKETS SOLD",
      value: "2,082",
      change: "8.2%",
      isPositive: true,
      icon: Ticket,
      subtitle: "Total unique tickets issued"
    },
    {
      title: "ACTIVE EVENTS",
      value: "2",
      change: "0%",
      isPositive: true,
      icon: Calendar,
      subtitle: "Currently live and booking"
    },
    {
      title: "ATTENDEE GROWTH",
      value: "+450",
      change: "24.1%",
      isPositive: true,
      icon: Users,
      subtitle: "New users in the last 30 days"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {metrics.map((metric, i) => (
        <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-44">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F0F2FF] text-[#6365f1] flex items-center justify-center">
              <metric.icon size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight size={14} strokeWidth={3} />
              {metric.change}
            </span>
          </div>
          
          <div className="mt-4">
            <h3 className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-1">{metric.title}</h3>
            <p className="text-3xl font-bold text-[#1D1F23] tracking-tight">{metric.value}</p>
          </div>
          
          <p className="text-[11px] text-neutral-500 mt-2">{metric.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
