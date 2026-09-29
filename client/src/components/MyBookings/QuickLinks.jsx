import React from 'react';
import { Download, HelpCircle, Settings, ChevronRight } from 'lucide-react';

const QuickLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {/* History */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col">
        <h3 className="flex items-center gap-2 font-bold text-[#1D1F23] mb-3">
          <Download size={18} className="text-[#6365f1]" /> Booking History
        </h3>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Export your entire transaction history and booking details as a
          CSV or PDF file for your personal records.
        </p>
        <button className="text-[#6365f1] font-semibold text-sm hover:text-[#4f51e9] flex items-center gap-1 cursor-pointer mt-auto w-fit">
          Download Report <ChevronRight size={16} />
        </button>
      </div>
      {/* Support */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col">
        <h3 className="flex items-center gap-2 font-bold text-[#1D1F23] mb-3">
          <HelpCircle size={18} className="text-[#6365f1]" /> Help & Support
        </h3>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Having trouble with a ticket or need to request a refund? Our
          support team is available 24/7 to assist you.
        </p>
        <button className="text-[#6365f1] font-semibold text-sm hover:text-[#4f51e9] flex items-center gap-1 cursor-pointer mt-auto w-fit">
          Visit Help Center <ChevronRight size={16} />
        </button>
      </div>
      {/* Settings */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col">
        <h3 className="flex items-center gap-2 font-bold text-[#1D1F23] mb-3">
          <Settings size={18} className="text-[#6365f1]" /> Manage
          Preferences
        </h3>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Update your contact details, notification settings, and payment
          methods to ensure a smooth checkout experience.
        </p>
        <button className="text-[#6365f1] font-semibold text-sm hover:text-[#4f51e9] flex items-center gap-1 cursor-pointer mt-auto w-fit">
          Profile Settings <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuickLinks;
