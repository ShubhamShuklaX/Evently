import React from "react";

const StepTickets = ({ formData, handleChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#1D1F23]">Tickets</h2>
      <p className="text-neutral-500 text-sm mt-1 mb-8">
        Set up your ticket tiers and pricing.
      </p>

      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#1D1F23]">General Admission</h3>
          <button className="text-sm font-semibold text-rose-500 hover:text-rose-600">
            Remove
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1D1F23] mb-2 uppercase tracking-wide">
              Price ($)
            </label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              placeholder="0.00"
              className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6365f1] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1D1F23] mb-2 uppercase tracking-wide">
              Capacity
            </label>
            <input
              type="number"
              placeholder="100"
              className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6365f1] transition-all"
            />
          </div>
        </div>
      </div>

      <button className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 font-bold hover:bg-neutral-50 hover:text-[#1D1F23] transition-colors">
        + Add Another Ticket Tier
      </button>
    </div>
  );
};

export default StepTickets;
