import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Stepper from "../components/CreateEvent/Stepper";
import StepInfo from "../components/CreateEvent/StepInfo";
import StepMedia from "../components/CreateEvent/StepMedia";
import StepLocation from "../components/CreateEvent/StepLocation";
import StepTickets from "../components/CreateEvent/StepTickets";
import { API_BASE } from "../utils/api";
import { useBooking } from "@/context/BookingContext";
import { useToast } from "../context/ToastContext";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitAction, setSubmitAction] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    location: "",
    date: "",
    time: "",
    img: "",
    description: "",
  });
  const { fetchEvents } = useBooking();
  const { toast, showModal } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setError("");

    if (currentStep === 1) {
      if (
        !formData.title.trim() ||
        !formData.category ||
        !formData.description.trim()
      ) {
        const msg = "Please fill in the title, category, and description.";
        setError(msg);
        toast.warning("Incomplete Information", msg);
        return;
      }
    }

    if (currentStep === 2) {
      if (!formData.img) {
        const msg = "Please upload an image banner or provide an image URL.";
        setError(msg);
        toast.warning("Image Required", msg);
        return;
      }
    }

    if (currentStep === 3) {
      if (!formData.location.trim() || !formData.date || !formData.time) {
        const msg = "Please specify the venue location, date, and time.";
        setError(msg);
        toast.warning("Details Required", msg);
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (status = "Live") => {
    try {
      const token = localStorage.getItem("evently_token");

      if (!formData.price || Number(formData.price) <= 0) {
        setError("Please enter a valid ticket price.");
        return;
      }

      setSubmitting(true);
      setSubmitAction(status);
      setError("");

      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("location", formData.location);
      submitData.append("price", formData.price);
      submitData.append("date", formData.date);
      submitData.append("time", formData.time);
      submitData.append("category", formData.category);
      submitData.append("status", status);
      submitData.append("description", formData.description);
      submitData.append("img", formData.img);

      const res = await fetch(`${API_BASE}/api/events`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: submitData,
      });
      const result = await res.json();
      if (!res.ok) {
        const errorMsg = result.error || "Failed to create event";
        setError(errorMsg);
        toast.error("Creation Failed", errorMsg);
        return;
      } else {
        await fetchEvents();
        if (status === "Live") {
          showModal({
            type: "celebration",
            title: "Event Published Successfully! 🎉",
            message: `"${formData.title}" is now officially published! Attendees can browse and book seats immediately.`,
            confirmText: "Go to My Events",
            showCancel: false,
            onConfirm: () => {
              void navigate("/organizer/my-events");
            },
          });
        } else {
          toast.success("Draft Saved", `"${formData.title}" was saved as a draft.`);
          void navigate("/organizer/my-events");
        }
      }
    } catch (error) {
      console.error(error);
      const errText = "An unexpected error occurred while creating the event.";
      setError(errText);
      toast.error("Network Error", errText);
    } finally {
      setSubmitting(false);
      setSubmitAction("");
    }
  };

  // Stepper UI
  const steps = [
    { id: 1, name: "Info" },
    { id: 2, name: "Media" },
    { id: 3, name: "Location & Time" },
    { id: 4, name: "Tickets" },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans flex flex-col">
      <Header />

      <Stepper currentStep={currentStep} steps={steps} />

      {/* Main Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D1F23] tracking-tight">
            Create New Event
          </h1>
          <p className="text-neutral-500 mt-2 text-sm sm:text-base lg:text-lg">
            List your premium experience and start selling tickets.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 sm:p-8 md:p-10">
          {currentStep === 1 && (
            <StepInfo formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 2 && (
            <StepMedia formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 3 && (
            <StepLocation formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 4 && (
            <StepTickets formData={formData} handleChange={handleChange} />
          )}

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-semibold">
              {error}
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                disabled={submitting}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-neutral-600 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            ) : (
              <div></div> /* Spacer */
            )}

            <div className="flex flex-wrap items-center gap-3 justify-end">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-[#6365f1] text-white hover:bg-[#4f51e9] transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  Next Step
                  <ArrowRight size={18} />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => void handleSubmit("Draft")}
                    className="flex-1 sm:flex-initial px-5 py-3 cursor-pointer rounded-xl font-bold text-neutral-600 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {submitting && submitAction === "Draft" ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-neutral-600" />
                        Saving Draft...
                      </>
                    ) : (
                      "Save Draft"
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => void handleSubmit("Live")}
                    className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
                  >
                    {submitting && submitAction === "Live" ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-white" />
                        Publishing Event...
                      </>
                    ) : (
                      "Publish Event"
                    )}
                  </button>
                </>
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
