import React from "react";
import { BellRing } from "lucide-react";

const FinancialPerformance = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-6">
      {/* Revenue Trends Chart */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm flex-1 p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#1D1F23]">Revenue Trends</h3>
            <p className="text-neutral-500 text-sm mt-1">
              Monthly breakdown of sales performance
            </p>
          </div>
          <button className="bg-[#F0F2FF] text-[#6365f1] text-xs font-bold px-3 py-1.5 rounded-full">
            Last 6 Months
          </button>
        </div>

        <div className="relative h-64 w-full mt-4">
          {/* Y Axis Labels */}
          <div className="absolute left-0 top-0 bottom-6 w-12 flex flex-col justify-between text-xs text-neutral-400 font-medium">
            <span>₹10000</span>
            <span>₹7500</span>
            <span>₹5000</span>
            <span>₹2500</span>
            <span>₹0</span>
          </div>

          {/* Grid Lines */}
          <div className="absolute left-14 right-0 top-2 bottom-6 flex flex-col justify-between">
            <div className="border-b border-neutral-100 w-full h-px"></div>
            <div className="border-b border-neutral-100 w-full h-px"></div>
            <div className="border-b border-neutral-100 w-full h-px"></div>
            <div className="border-b border-neutral-100 w-full h-px"></div>
            <div className="border-b border-neutral-100 w-full h-px"></div>
          </div>

          {/* SVG Area Chart */}
          <div className="absolute left-14 right-0 top-2 bottom-6 overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6365f1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#6365f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,60 C 15,50 25,55 40,50 C 50,40 60,45 75,30 C 85,20 95,15 100,10 L 100,100 L 0,100 Z"
                fill="url(#gradient)"
              />
              <path
                d="M 0,60 C 15,50 25,55 40,50 C 50,40 60,45 75,30 C 85,20 95,15 100,10"
                fill="none"
                stroke="#6365f1"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* X Axis Labels */}
          <div className="absolute left-14 right-0 bottom-0 flex justify-between text-xs text-neutral-400 font-medium px-4">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>
      </div>

      {/* Ticket Breakdown */}
      <div className="w-87.5 shrink-0 flex flex-col gap-6">
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
          <h3 className="text-xl font-bold text-[#1D1F23]">Ticket Breakdown</h3>
          <p className="text-neutral-500 text-sm mt-1 mb-8">
            Sales by seat category
          </p>

          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-[#1D1F23]">VIP Pit</span>
                <span className="text-neutral-500">420 / 500 sold</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#6365f1] w-[84%] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-[#1D1F23]">Front Orchestra</span>
                <span className="text-neutral-500">850 / 1000 sold</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#6365f1] w-[85%] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-[#1D1F23]">Back Orchestra</span>
                <span className="text-neutral-500">612 / 800 sold</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#6365f1] w-[76%] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-[#1D1F23]">Mezzanine</span>
                <span className="text-neutral-500">200 / 400 sold</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#6365f1] w-[50%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Selling Fast Alert */}
        <div className="bg-[#F8F9FA] border border-neutral-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-[#6365f1] text-xs font-bold tracking-wider uppercase mb-2">
            <BellRing size={14} />
            Selling Fast
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            "Midnight Sun Music Festival"{" "}
            <strong className="text-neutral-900">Front Orchestra</strong>{" "}
            tickets are at 85% capacity. Consider raising prices for the final
            batch.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialPerformance;
