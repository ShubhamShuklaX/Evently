import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Organizer/Sidebar";
import { User, Building, Landmark, Bell, Save, CheckCircle2 } from "lucide-react";

const OrganizerSettings = () => {
  const user = JSON.parse(localStorage.getItem("evently_user") || "null");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "Jordan Sterling",
    email: user?.email || "organizer@evently.io",
    organization: "Global Arena Entertainment Ltd.",
    upiId: "evently.organizer@okhdfcbank",
    bankAccount: "9876543210123",
    ifsc: "HDFC0001234",
    emailNotifs: true,
    bookingSms: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <div className="flex-1 w-full px-6 lg:px-15 py-8 flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 max-w-3xl flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1D1F23]">Studio Settings</h1>
            <p className="text-neutral-500 text-sm mt-1">
              Configure your organizer credentials, payout settlement bank, and notifications.
            </p>
          </div>

          {saved && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 size={18} />
              <span>Organizer settings updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Profile Info */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#1D1F23] flex items-center gap-2 mb-4">
                <User size={18} className="text-[#6365f1]" />
                Organizer Identity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6365f1]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6365f1]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Company / Studio Entity</label>
                  <div className="relative">
                    <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={profile.organization}
                      onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm outline-none focus:border-[#6365f1]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payout Details */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#1D1F23] flex items-center gap-2 mb-4">
                <Landmark size={18} className="text-[#6365f1]" />
                Settlement & Payout Account
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">UPI ID for Express Settlements</label>
                  <input
                    type="text"
                    value={profile.upiId}
                    onChange={(e) => setProfile({ ...profile, upiId: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6365f1] font-mono text-neutral-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">Bank Account Number</label>
                  <input
                    type="text"
                    value={profile.bankAccount}
                    onChange={(e) => setProfile({ ...profile, bankAccount: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6365f1] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={profile.ifsc}
                    onChange={(e) => setProfile({ ...profile, ifsc: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6365f1] uppercase font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#1D1F23] flex items-center gap-2 mb-4">
                <Bell size={18} className="text-[#6365f1]" />
                Event Notifications
              </h3>

              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.emailNotifs}
                    onChange={(e) => setProfile({ ...profile, emailNotifs: e.target.checked })}
                    className="accent-[#6365f1] w-4 h-4 rounded"
                  />
                  <span>Receive instant email digest upon every ticket booking</span>
                </label>
                <label className="flex items-center gap-3 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.bookingSms}
                    onChange={(e) => setProfile({ ...profile, bookingSms: e.target.checked })}
                    className="accent-[#6365f1] w-4 h-4 rounded"
                  />
                  <span>Enable SMS notifications for low venue seat availability alerts</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6365f1] hover:bg-[#4f51e9] text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Save size={16} />
                Save Studio Changes
              </button>
            </div>
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OrganizerSettings;
