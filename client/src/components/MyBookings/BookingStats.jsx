import React from 'react';

const BookingStats = ({ liveBookings }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
          <span className="cursor-pointer hover:text-[#1D1F23]">Home</span>
          <span>›</span>
          <span className="font-semibold text-[#1D1F23]">My Bookings</span>
        </div>
        <h1 className="text-4xl font-extrabold text-[#1D1F23] mb-3 tracking-tight">
          My Bookings
        </h1>
        <p className="text-neutral-500 max-w-xl">
          Manage your upcoming tickets, review past experiences, and access
          entry QR codes for your booked events.
        </p>
      </div>

      {/* Stats Widgets */}
      <div className="flex bg-white border border-neutral-200 rounded-xl p-1 shadow-sm shrink-0">
        <div className="px-6 py-3 text-center border-r border-neutral-100">
          <p className="text-2xl font-bold text-[#6365f1]">
            {liveBookings.filter((b) => b.status === "upcoming").length}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mt-1">
            Upcoming
          </p>
        </div>
        <div className="px-6 py-3 text-center">
          <p className="text-2xl font-bold text-[#1D1F23]">
            {liveBookings.length}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mt-1">
            Total Events
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingStats;
