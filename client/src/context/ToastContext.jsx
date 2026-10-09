import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Sparkles,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [modalState, setModalState] = useState(null);

  // Toast functions
  const addToast = useCallback((type, title, message = "", duration = 4000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (title, message, duration) =>
      addToast("success", title, message, duration),
    error: (title, message, duration) =>
      addToast("error", title, message, duration),
    warning: (title, message, duration) =>
      addToast("warning", title, message, duration),
    info: (title, message, duration) =>
      addToast("info", title, message, duration),
  };

  // Modal functions
  const showModal = useCallback((options) => {
    setModalState(options);
  }, []);

  const hideModal = useCallback(() => {
    setModalState(null);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showModal, hideModal }}>
      {children}

      {/* Floating Toast Container */}
      <div
        aria-live="polite"
        className="fixed top-4 sm:top-5 left-4 right-4 sm:left-auto sm:right-5 z-[9999] flex flex-col gap-2.5 w-auto sm:w-full sm:max-w-sm pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            let borderColor = "border-neutral-200";
            let icon = <Info size={18} className="text-blue-600 shrink-0" />;
            let bgAccent = "bg-white";

            if (t.type === "success") {
              borderColor = "border-emerald-200";
              icon = (
                <CheckCircle2
                  size={18}
                  className="text-emerald-600 shrink-0"
                />
              );
            } else if (t.type === "error") {
              borderColor = "border-rose-200";
              icon = (
                <AlertCircle size={18} className="text-rose-600 shrink-0" />
              );
            } else if (t.type === "warning") {
              borderColor = "border-amber-200";
              icon = (
                <AlertTriangle
                  size={18}
                  className="text-amber-600 shrink-0"
                />
              );
            }

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`pointer-events-auto p-4 rounded-2xl shadow-xl shadow-black/10 border ${borderColor} ${bgAccent} backdrop-blur-md flex items-start gap-3 relative overflow-hidden`}
              >
                <div className="mt-0.5">{icon}</div>
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-sm font-bold text-[#1D1F23] leading-snug">
                    {t.title}
                  </h4>
                  {t.message && (
                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed break-words">
                      {t.message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(t.id)}
                  className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer rounded-lg hover:bg-neutral-100"
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Global Interactive Modal Dialog */}
      <AnimatePresence>
        {modalState && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (modalState.dismissible !== false) {
                  hideModal();
                  modalState.onCancel?.();
                }
              }}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-2xl border border-neutral-100 overflow-hidden z-10"
            >
              {/* Type Accent Icon */}
              {modalState.type === "celebration" ||
              modalState.type === "success" ? (
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 ring-8 ring-emerald-50/50">
                  <PartyPopper size={28} />
                </div>
              ) : modalState.type === "danger" ? (
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5 ring-8 ring-rose-50/50">
                  <AlertTriangle size={28} />
                </div>
              ) : modalState.type === "warning" ? (
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 ring-8 ring-amber-50/50">
                  <AlertCircle size={28} />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 ring-8 ring-indigo-50/50">
                  <Sparkles size={28} />
                </div>
              )}

              <h3 className="text-xl font-bold text-[#1D1F23]">
                {modalState.title}
              </h3>
              {modalState.message && (
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                  {modalState.message}
                </p>
              )}

              {/* Extra details custom card if provided */}
              {modalState.details && (
                <div className="mt-4 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/80 text-xs text-neutral-600">
                  {modalState.details}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 mt-7">
                {modalState.showCancel !== false && modalState.cancelText && (
                  <button
                    type="button"
                    onClick={() => {
                      hideModal();
                      modalState.onCancel?.();
                    }}
                    className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
                  >
                    {modalState.cancelText}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    hideModal();
                    modalState.onConfirm?.();
                  }}
                  className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-2 ${
                    modalState.type === "danger"
                      ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20"
                      : "bg-[#6365f1] hover:bg-[#4f51e9] text-white shadow-indigo-600/20"
                  }`}
                >
                  {modalState.confirmText || "Continue"}
                  {modalState.type !== "danger" && <ArrowRight size={15} />}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};
