import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Organizer/Sidebar";
import { Tag, Plus, Trash2 } from "lucide-react";

const initialCoupons = [
  { id: "1", code: "EARLYBIRD20", discount: 20, type: "percentage", maxUses: 100, used: 64, active: true },
  { id: "2", code: "VIPFEST50", discount: 50, type: "percentage", maxUses: 25, used: 25, active: false },
  { id: "3", code: "EVENTLYFLAT500", discount: 500, type: "flat", maxUses: 200, used: 89, active: true },
];

const OrganizerDiscounts = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showModal, setShowModal] = useState(false);
  const [newCode, setNewCode] = useState({ code: "", discount: "", type: "percentage", maxUses: "50" });

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCode.code.trim() || !newCode.discount) return;

    setCoupons((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        code: newCode.code.toUpperCase().trim(),
        discount: Number(newCode.discount),
        type: newCode.type,
        maxUses: Number(newCode.maxUses) || 50,
        used: 0,
        active: true,
      },
    ]);
    setNewCode({ code: "", discount: "", type: "percentage", maxUses: "50" });
    setShowModal(false);
  };

  const deleteCoupon = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <div className="flex-1 w-full px-6 lg:px-15 py-8 flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1D1F23]">Discount Codes</h1>
              <p className="text-neutral-500 text-sm mt-1">
                Create promotional promo vouchers and tracking codes for marketing campaigns.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6365f1] hover:bg-[#4f51e9] text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={16} />
              Create Promo Code
            </button>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-3.5 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <span>Code</span>
              <span>Discount</span>
              <span>Usage / Limit</span>
              <span>Total Saved</span>
              <span>Status</span>
              <span className="text-right">Action</span>
            </div>

            <div className="divide-y divide-neutral-100">
              {coupons.map((c) => (
                <div key={c.id} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-4 items-center text-sm">
                  <div className="flex items-center gap-2 font-mono font-bold text-[#1D1F23]">
                    <Tag size={15} className="text-[#6365f1]" />
                    {c.code}
                  </div>

                  <span className="font-semibold text-neutral-800">
                    {c.type === "percentage" ? `${c.discount}% OFF` : `₹${c.discount} OFF`}
                  </span>

                  <span className="text-neutral-600">
                    {c.used} / {c.maxUses} redeemed
                  </span>

                  <span className="font-medium text-emerald-600">
                    ₹{(c.used * (c.type === "percentage" ? 250 : c.discount)).toLocaleString("en-IN")}
                  </span>

                  <div>
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        c.active ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {c.active ? "Active" : "Expired"}
                    </span>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => deleteCoupon(c.id)}
                      className="p-2 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">Create Promo Code</h3>
                <p className="text-xs text-neutral-500 mb-5">Define coupon code and discount percentage.</p>

                <form onSubmit={handleCreateCoupon} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Coupon Code</label>
                    <input
                      type="text"
                      placeholder="e.g. FESTIVAL25"
                      value={newCode.code}
                      onChange={(e) => setNewCode({ ...newCode, code: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm uppercase font-mono font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Discount Amount</label>
                      <input
                        type="number"
                        placeholder="25"
                        value={newCode.discount}
                        onChange={(e) => setNewCode({ ...newCode, discount: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Discount Type</label>
                      <select
                        value={newCode.type}
                        onChange={(e) => setNewCode({ ...newCode, type: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm"
                      >
                        <option value="percentage">% Percentage</option>
                        <option value="flat">₹ Flat Off</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-sm font-semibold bg-[#6365f1] hover:bg-[#4f51e9] text-white rounded-xl shadow-sm"
                    >
                      Save Code
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OrganizerDiscounts;
