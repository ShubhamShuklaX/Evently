import { useNavigate } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import notFound from "../assets/404Notfound.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="max-w-md w-full flex flex-col items-center">
          <div className="relative mb-8 w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border border-neutral-200/80 bg-neutral-900 group">
            <img
              src={notFound}
              alt="404 Not Found"
              className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full mb-3">
            404 Page Not Found
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D1F23] mb-3 tracking-tight">
            Lost in the crowd?
          </h1>

          <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
            We couldn't find the page or event you're looking for.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto px-6 h-11 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>

            <button
              onClick={() => navigate("/events")}
              className="w-full sm:w-auto px-6 h-11 bg-white hover:bg-neutral-50 text-[#1D1F23] font-semibold rounded-xl border border-neutral-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <Compass size={16} />
              Explore Events
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
