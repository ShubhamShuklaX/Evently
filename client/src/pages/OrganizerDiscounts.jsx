import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Organizer/Sidebar";
import { Tag, Plus, Trash2, Loader2, AlertCircle, Copy, Check } from "lucide-react";
import { API_BASE } from "../utils/api";
import { useToast } from "../context/ToastContext";

const OrganizerDiscounts = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const { toast, showModal: showConfirmDialog } = useToast();
  const [newCode, setNewCode] = useState({
    code: "",
    discount: "",
    type: "percentage",
    maxUses: "50",
  });

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("evently_token");
      const res = await fetch(`${API_BASE}/api/coupons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.coupons)) {
        setCoupons(data.coupons);
      }
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!newCode.code.trim() || !newCode.discount) {
      setError("Please fill in both the code and discount amount.");
      return;
    }

    const token = localStorage.getItem("evently_token");
    try {
      setSubmitting(true);
      setError("");

      const res = await fetch(`${API_BASE}/api/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: newCode.code.trim().toUpperCase(),
          discount: Number(newCode.discount),
          type: newCode.type,
          maxUses: Number(newCode.maxUses) || 50,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create promo code");
        return;
      }

      if (data.coupon) {
        setCoupons((prev) => [data.coupon, ...prev]);
        toast.success("Promo Code Created!", `"${data.coupon.code}" is ready for customers.`);
      }
      setNewCode({ code: "", discount: "", type: "percentage", maxUses: "50" });
      setShowModal(false);
    } catch (err) {
      console.error("Error creating coupon:", err);
      const errText = "Network error while creating promo code. Please try again.";
      setError(errText);
      toast.error("Network Error", errText);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteCoupon = (id, code) => {
    showConfirmDialog({
      type: "danger",
      title: "Delete Promo Code?",
      message: `Are you sure you want to delete "${code}"? Customers will no longer be able to apply this discount.`,
      confirmText: "Delete Code",
      cancelText: "Cancel",
      onConfirm: async () => {
        const token = localStorage.getItem("evently_token");
        try {
          const res = await fetch(`${API_BASE}/api/coupons/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            setCoupons((prev) => prev.filter((c) => c.id !== id));
            toast.success("Coupon Deleted", `Promo code "${code}" has been removed.`);
          } else {
            const data = await res.json().catch(() => ({}));
            toast.error("Deletion Failed", data.error || "Failed to delete coupon");
          }
        } catch (err) {
          console.error("Error deleting coupon:", err);
          toast.error("Network Error", "Unable to reach server to delete coupon.");
        }
      },
    });
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Copied to Clipboard", `Code "${code}" copied.`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1F23]">
                Discount Codes
              </h1>
              <p className="text-neutral-500 text-xs sm:text-sm mt-1">
                Create promotional promo vouchers and tracking codes for marketing campaigns.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setError("");
                setShowModal(true);
              }}
              className="flex items-center self-start sm:self-auto gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#6365f1] hover:bg-[#4f51e9] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              <Plus size={16} />
              Create Promo Code
            </button>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[680px]">
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-3.5 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  <span>Code</span>
                  <span>Discount</span>
                  <span>Usage / Limit</span>
                  <span>Total Saved</span>
                  <span>Status</span>
                  <span className="text-right">Action</span>
                </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <Loader2 size={32} className="text-[#6365f1] animate-spin" />
                <p className="text-sm text-neutral-500 font-medium">
                  Loading discount codes...
                </p>
              </div>
            ) : coupons.length === 0 ? (
              <div className="text-center py-16 px-6">
                <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                  <Tag size={26} />
                </div>
                <h3 className="text-lg font-bold text-neutral-800">
                  No discount codes found
                </h3>
                <p className="text-sm text-neutral-500 mt-1 max-w-sm mx-auto mb-6">
                  You haven't created any promotional promo codes or discount vouchers yet.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setShowModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6365f1] hover:bg-[#4f51e9] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  <Plus size={16} />
                  Create First Promo Code
                </button>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {coupons.map((c) => (
                  <div
                    key={c.id}
                    className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-4 items-center text-sm hover:bg-neutral-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-2 font-mono font-bold text-[#1D1F23]">
                      <Tag size={15} className="text-[#6365f1]" />
                      {c.code}
                    </div>

                    <span className="font-semibold text-neutral-800">
                      {c.type === "percentage"
                        ? `${c.discount}% OFF`
                        : `₹${c.discount} OFF`}
                    </span>

                    <span className="text-neutral-600">
                      {c.used || 0} / {c.maxUses} redeemed
                    </span>

                    <span className="font-medium text-emerald-600">
                      ₹
                      {(
                        (c.used || 0) * (c.type === "percentage" ? 250 : c.discount)
                      ).toLocaleString("en-IN")}
                    </span>

                    <div>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          c.active
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-neutral-100 text-neutral-500 border border-neutral-200"
                        }`}
                      >
                        {c.active ? "Active" : "Expired"}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(c.code)}
                        title="Copy Promo Code"
                        className="p-2 text-neutral-400 hover:text-[#6365f1] hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                      >
                        {copiedCode === c.code ? (
                          <Check size={16} className="text-emerald-600" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCoupon(c.id, c.code)}
                        title="Delete Promo Code"
                        className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
              </div>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">
                  Create Promo Code
                </h3>
                <p className="text-xs text-neutral-500 mb-5">
                  Define coupon code and discount percentage or flat amount.
                </p>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2 mb-4">
                    <AlertCircle size={16} className="shrink-0 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                <form
                  onSubmit={handleCreateCoupon}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. FESTIVAL25"
                      value={newCode.code}
                      onChange={(e) =>
                        setNewCode({ ...newCode, code: e.target.value })
                      }
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm uppercase font-mono font-bold focus:outline-none focus:border-[#6365f1]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Discount Amount
                      </label>
                      <input
                        type="number"
                        placeholder="25"
                        min="1"
                        value={newCode.discount}
                        onChange={(e) =>
                          setNewCode({ ...newCode, discount: e.target.value })
                        }
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#6365f1]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                        Discount Type
                      </label>
                      <select
                        value={newCode.type}
                        onChange={(e) =>
                          setNewCode({ ...newCode, type: e.target.value })
                        }
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#6365f1]"
                      >
                        <option value="percentage">% Percentage</option>
                        <option value="flat">₹ Flat Off</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Max Uses
                    </label>
                    <input
                      type="number"
                      placeholder="50"
                      min="1"
                      value={newCode.maxUses}
                      onChange={(e) =>
                        setNewCode({ ...newCode, maxUses: e.target.value })
                      }
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#6365f1]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-4">
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2 text-sm font-semibold bg-[#6365f1] hover:bg-[#4f51e9] text-white rounded-xl shadow-sm cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      {submitting && <Loader2 size={14} className="animate-spin" />}
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
