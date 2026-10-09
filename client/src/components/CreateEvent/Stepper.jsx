import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Stepper = ({ currentStep, steps }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-neutral-200 py-3 sm:py-4 px-4 sm:px-6 sticky top-17 z-40">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <button
          onClick={() => navigate("/organizer")}
          className="flex items-center cursor-pointer gap-1.5 sm:gap-2 text-neutral-500 hover:text-neutral-900 transition-colors font-medium text-xs sm:text-sm shrink-0"
        >
          <ArrowLeft size={16} />
          <span>Dashboard</span>
        </button>

        {/* Mobile current step indicator */}
        <div className="flex sm:hidden items-center gap-1.5">
          <span className="bg-[#EEF0FF] text-[#6365f1] text-xs font-semibold px-2.5 py-1 rounded-full">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.name}
          </span>
        </div>

        {/* Tablet / Desktop Stepper */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    currentStep >= step.id
                      ? "bg-[#6365f1] text-white"
                      : "bg-neutral-100 text-neutral-400"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`text-xs md:text-sm font-semibold truncate ${
                    currentStep >= step.id
                      ? "text-[#1D1F23]"
                      : "text-neutral-400"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-6 md:w-10 lg:w-12 h-px shrink-0 ${
                    currentStep > step.id ? "bg-[#6365f1]" : "bg-neutral-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="hidden md:block w-24"></div> {/* Spacer for centering */}
      </div>
    </div>
  );
};

export default Stepper;
