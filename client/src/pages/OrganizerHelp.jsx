import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Organizer/Sidebar";
import { HelpCircle, ChevronDown, ChevronUp, Send, CheckCircle2, BookOpen, ShieldCheck } from "lucide-react";

const faqs = [
  {
    q: "When are ticket revenues settled to my bank account?",
    a: "Payouts are automatically batched every 24 hours. For live events, funds are disbursed directly to your registered UPI or bank account on a T+1 business day cycle.",
  },
  {
    q: "How does the interactive seat matrix map out for attendees?",
    a: "When you list an event with a capacity (e.g. 100), Evently automatically provisions distinct seating rows (A, B, C...) and seat numbers with live locking algorithms to prevent double-booking.",
  },
  {
    q: "Can I update ticket prices after publishing an event?",
    a: "Yes! Navigate to Events Management, click 'Edit' on any active event, and you can update ticket tiers, schedule times, or event banners instantly.",
  },
  {
    q: "What is the difference between 'Live' and 'Draft' status?",
    a: "Live events appear on the public Discover Events catalog, home page, and seat selection checkout. Draft events remain private to your Organizer Hub until you're ready to publish.",
  },
];

const OrganizerHelp = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketMessage, setTicketMessage] = useState("");

  const handleSendTicket = (e) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    setTicketSent(true);
    setTicketMessage("");
    setTimeout(() => setTicketSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <div className="flex-1 w-full px-6 lg:px-15 py-8 flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 max-w-3xl flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1D1F23]">Organizer Help Center</h1>
            <p className="text-neutral-500 text-sm mt-1">
              Browse platform guides, settlement protocols, or reach our organizer support concierge.
            </p>
          </div>

          {/* Quick Guides */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#6365f1] flex items-center justify-center shrink-0">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1D1F23] text-sm">Organizer Playbook</h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Best practices for promotional flyers, tiered pricing strategies, and door check-in apps.
                </p>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1D1F23] text-sm">Dispute & Refund Policy</h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Guidelines on event cancellations, weather reschedules, and chargeback protection.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1D1F23] mb-4 flex items-center gap-2">
              <HelpCircle size={18} className="text-[#6365f1]" />
              Frequently Asked Questions
            </h3>

            <div className="divide-y divide-neutral-100">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left font-semibold text-sm text-[#1D1F23] hover:text-[#6365f1] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs text-neutral-500 leading-relaxed animate-in fade-in">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Support Ticket */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#1D1F23] mb-1">Direct Organizer Concierge</h3>
            <p className="text-xs text-neutral-500 mb-4">
              Have an urgent venue inquiry or need customized seat mapping? Drop a message directly to engineering.
            </p>

            {ticketSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span>Ticket received! Our organizer specialist will respond within 30 minutes.</span>
              </div>
            ) : (
              <form onSubmit={handleSendTicket} className="flex flex-col gap-3">
                <textarea
                  rows={3}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your inquiry or venue assistance required..."
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-sm outline-none focus:border-[#6365f1] resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6365f1] hover:bg-[#4f51e9] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Send size={14} />
                    Send Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OrganizerHelp;
