import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Organizer/Sidebar';
import MetricsCards from '../components/Organizer/MetricsCards';
import FinancialPerformance from '../components/Organizer/FinancialPerformance';
import { Download, Plus, CheckCircle2, AlertCircle, Bell } from 'lucide-react';

const OrganizerDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 flex gap-8">
        <Sidebar />
        
        <main className="flex-1 min-w-0">
          {/* Top Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1D1F23]">Organizer Hub</h1>
              <p className="text-neutral-500 mt-1">Welcome back, Jordan. Here's how your events are performing.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm">
                <Download size={16} />
                Export Data
              </button>
              <button 
                onClick={() => window.location.href = '/organizer/create'}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6365f1] text-white text-sm font-semibold hover:bg-[#4f51e9] transition-colors shadow-sm"
              >
                <Plus size={16} />
                Create New Event
              </button>
            </div>
          </div>

          <MetricsCards />
          
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-neutral-200 mb-6">
            <button className="pb-3 text-sm font-bold text-[#1D1F23] border-b-2 border-[#6365f1]">
              Financial Performance
            </button>
            <button className="pb-3 text-sm font-semibold text-neutral-500 hover:text-[#1D1F23]">
              Manage Events
            </button>
          </div>

          <FinancialPerformance />

          {/* Bottom Notification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
            <div className="bg-[#F8FFF9] border border-[#E1F0E5] rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1D1F23] text-sm mb-0.5">Verified Payouts</h4>
                <p className="text-sm text-neutral-500">Successfully processed $15,400 today.</p>
              </div>
            </div>
            
            <div className="bg-[#FFFDF5] border border-[#F4EDD3] rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <AlertCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1D1F23] text-sm mb-0.5">Action Required</h4>
                <p className="text-sm text-neutral-500">Update venue insurance for "Championship Finals".</p>
              </div>
            </div>
            
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1D1F23] text-sm mb-0.5">New Notifications</h4>
                <p className="text-sm text-neutral-500">34 new ticket bookings in the last hour.</p>
              </div>
            </div>
          </div>

        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrganizerDashboard;
