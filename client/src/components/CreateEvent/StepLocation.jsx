import React from 'react';

const StepLocation = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#1D1F23]">Location & Time</h2>
      <p className="text-neutral-500 text-sm mt-1 mb-8">Where and when is your event happening?</p>
      
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-bold text-[#1D1F23] mb-2">Venue Name</label>
          <input 
            type="text" 
            placeholder="e.g., Madison Square Garden" 
            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6365f1] focus:ring-1 focus:ring-[#6365f1] transition-all"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-[#1D1F23] mb-2">Date</label>
            <input 
              type="date" 
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6365f1] focus:ring-1 focus:ring-[#6365f1] transition-all text-neutral-600"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#1D1F23] mb-2">Time</label>
            <input 
              type="time" 
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6365f1] focus:ring-1 focus:ring-[#6365f1] transition-all text-neutral-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepLocation;
