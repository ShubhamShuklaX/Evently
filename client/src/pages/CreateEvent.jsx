import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Stepper from '../components/CreateEvent/Stepper';
import StepInfo from '../components/CreateEvent/StepInfo';
import StepMedia from '../components/CreateEvent/StepMedia';
import StepLocation from '../components/CreateEvent/StepLocation';
import StepTickets from '../components/CreateEvent/StepTickets';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Stepper UI
  const steps = [
    { id: 1, name: 'Info' },
    { id: 2, name: 'Media' },
    { id: 3, name: 'Location & Time' },
    { id: 4, name: 'Tickets' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />
      
      <Stepper currentStep={currentStep} steps={steps} />

      {/* Main Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-[#1D1F23] tracking-tight">Create New Event</h1>
          <p className="text-neutral-500 mt-2 text-lg">List your premium experience and start selling tickets.</p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-10">
          
          {currentStep === 1 && <StepInfo />}
          {currentStep === 2 && <StepMedia />}
          {currentStep === 3 && <StepLocation />}
          {currentStep === 4 && <StepTickets />}
          
          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-3 rounded-xl font-bold text-neutral-600 hover:bg-neutral-100 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            ) : (
              <div></div> /* Spacer */
            )}
            
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 rounded-xl font-bold text-neutral-600 hover:bg-neutral-100 transition-colors">
                Save Draft
              </button>
              
              {currentStep < 4 ? (
                <button 
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-6 py-3 rounded-xl font-bold bg-[#6365f1] text-white hover:bg-[#4f51e9] transition-colors flex items-center gap-2"
                >
                  Next Step
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/organizer')}
                  className="px-6 py-3 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors flex items-center gap-2"
                >
                  Publish Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;
