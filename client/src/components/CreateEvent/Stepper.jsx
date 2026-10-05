import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Stepper = ({ currentStep, steps }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-neutral-200 py-4 px-6 sticky top-17 z-40">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={() => navigate("/organizer")}
          className="flex items-center cursor-pointer gap-2 text-neutral-500 hover:text-neutral-900 transition-colors font-medium text-sm"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep >= step.id
                      ? "bg-[#6365f1] text-white"
                      : "bg-neutral-100 text-neutral-400"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`text-sm font-semibold ${
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
                  className={`w-12 h-px ${
                    currentStep > step.id ? "bg-[#6365f1]" : "bg-neutral-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="w-30"></div> {/* Spacer for centering */}
      </div>
    </div>
  );
};

export default Stepper;
