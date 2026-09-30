import React from "react";

const StepInfo = ({ formData, handleChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#1D1F23]">Basic Details</h2>
      <p className="text-neutral-500 text-sm mt-1 mb-8">
        Define the core identity of your event.
      </p>

      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-bold text-[#1D1F23] mb-2">
            Event Title
          </label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Midnight Sun Music Festival"
            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6365f1] focus:ring-1 focus:ring-[#6365f1] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1D1F23] mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6365f1] focus:ring-1 focus:ring-[#6365f1] transition-all text-neutral-600 appearance-none cursor-pointer"
          >
            <option value="">Select a category...</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="theater">Theater</option>
            <option value="conference">Conference</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1D1F23] mb-2">
            Short Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="A brief summary of what attendees can expect..."
            rows={4}
            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6365f1] focus:ring-1 focus:ring-[#6365f1] transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default StepInfo;
