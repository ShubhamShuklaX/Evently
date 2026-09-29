import React from 'react';
import { MoreHorizontal, ExternalLink } from 'lucide-react';
import img1 from "../../assets/7b99fda3-8fb3-4566-aaaa-198850298360.webp";
import img2 from "../../assets/7cd4cbd7-d18a-44e7-927d-ddc166223295.webp";
import img3 from "../../assets/d433d6cc-8a12-414e-b525-e789c91fd416.webp";

const events = [
  {
    id: "evt-123",
    title: "Midnight Sun Music Festival 2024",
    date: "Oct 24, 2024",
    status: "Published",
    sold: "892 / 1000",
    revenue: "$66,900",
    image: img1
  },
  {
    id: "evt-456",
    title: "SOMA Electronic Expo",
    date: "Nov 12, 2024",
    status: "Published",
    sold: "356 / 500",
    revenue: "$23,140",
    image: img2
  },
  {
    id: "evt-789",
    title: "Stand Up Night: MSG Special",
    date: "Dec 05, 2024",
    status: "Draft",
    sold: "0 / 2500",
    revenue: "$0",
    image: img3
  }
];

const EventsTable = () => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-neutral-50/50">
        <h2 className="text-lg font-bold text-[#1D1F23]">Recent Events</h2>
        <button className="text-sm font-semibold text-[#6365f1] hover:text-[#4f51e9]">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500 font-semibold bg-white">
              <th className="p-6">Event Detail</th>
              <th className="p-6">Status</th>
              <th className="p-6">Tickets Sold</th>
              <th className="p-6">Net Revenue</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-neutral-50/50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img src={event.image} alt="" className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                    <div>
                      <p className="font-bold text-[#1D1F23]">{event.title}</p>
                      <p className="text-xs text-neutral-500 mt-1">{event.date}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${
                    event.status === 'Published' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-medium text-neutral-700">{event.sold}</span>
                    <div className="w-24 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#6365f1] rounded-full" 
                        style={{ width: `${(parseInt(event.sold.split('/')[0]) / parseInt(event.sold.split('/')[1])) * 100}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td className="p-6 font-mono font-medium text-[#1D1F23]">
                  {event.revenue}
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-neutral-400 hover:text-[#6365f1] transition-colors" title="View Event Page">
                      <ExternalLink size={18} />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-[#1D1F23] transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsTable;
