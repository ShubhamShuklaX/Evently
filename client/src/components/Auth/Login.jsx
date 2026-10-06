import {
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Spotlight,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import authHeroImg from "../../assets/AuthHeroImg.png";
import { API_BASE } from "../../utils/api";
import { useToast } from "../../context/ToastContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(
    location.pathname === "/signup" ? "signup" : "login",
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "organizer",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const endpoint = tab === "login" ? "/api/auth/login" : "/api/auth/signup";
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(
          tab === "login"
            ? { email: formData.email, password: formData.password }
            : formData,
        ),
      });
      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || "Authentication failed";
        setError(errorMsg);
        toast.error(tab === "login" ? "Sign In Failed" : "Registration Failed", errorMsg);
        return;
      }

      localStorage.setItem("evently_token", data.token);
      localStorage.setItem("evently_user", JSON.stringify(data.user));

      if (tab === "login") {
        toast.success("Welcome Back!", `Signed in as ${data.user.name || data.user.email}`);
      } else {
        toast.success("Account Created!", "Welcome to Evently. Your journey begins now!");
      }

      if (data.user.role === "organizer" || data.user.role === "admin") {
        void navigate("/organizer");
      } else {
        void navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error);
      const errText = "Something went wrong. Please check your connection.";
      setError(errText);
      toast.error("Network Error", errText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Form Div */}
      <div className="flex-1 lg:w-1/2 px-25 py-20 flex flex-col gap-5 overflow-y-auto">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <h1 className="text-[30px] pt-0.5 font-mono font-extrabold">
            Evently
          </h1>
        </div>

        <div>
          <h2 className="text-3xl font-mono font-bold text-[#1D1F23]">
            {tab === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          {error && <p className="text-rose-500 font-bold mb-4">{error}</p>}
          <p className="text-neutral-500 text-sm mt-1.5">
            {tab === "login"
              ? "Access your tickets and personalized events."
              : "Join Evently and start booking in seconds."}
          </p>
        </div>

        <div className="flex bg-neutral-100 rounded-xl p-1 mt-2">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              void navigate("/login");
            }}
            className={`flex-1 text-sm font-semibold py-2 rounded-lg cursor-pointer transition-colors ${
              tab === "login"
                ? "bg-white text-[#1D1F23] shadow-md border border-neutral-300"
                : "text-neutral-500"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("signup");
              void navigate("/signup");
            }}
            className={`flex-1 text-sm font-semibold py-2 cursor-pointer rounded-lg transition-colors ${
              tab === "signup"
                ? "bg-white text-[#1D1F23] shadow-md border border-neutral-300"
                : "text-neutral-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="min-h-75">
          <AnimatePresence mode="wait">
            {tab === "login" ? (
              <motion.form
                onSubmit={handleSubmit}
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <label
                    htmlFor="login-email"
                    className="text-neutral-800 font-semibold text-[15px]"
                  >
                    Email Address
                  </label>
                  <div className="flex items-center justify-between border border-neutral-300 rounded-xl p-2 gap-3 mt-1 focus-within:border-[#6365f1]">
                    <Mail className="w-4 h-4 text-neutral-500" />
                    <input
                      id="login-email"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="flex-1 outline-none text-neutral-800 bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="text-neutral-800 font-semibold text-[15px]"
                  >
                    Password
                  </label>
                  <div className="flex items-center border border-neutral-300 rounded-xl p-2 gap-3 mt-1 focus-within:border-[#6365f1]">
                    <Lock className="w-4 h-4 text-neutral-500" />
                    <input
                      id="login-password"
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="flex-1 outline-none text-neutral-800 bg-transparent"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
                  <input type="checkbox" className="accent-[#6365f1] w-4 h-4" />
                  Remember me on this device
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 mt-3 bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Log In <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="signup-name"
                    className="text-neutral-800 font-semibold text-[15px]"
                  >
                    Full Name
                  </label>
                  <div className="flex items-center border border-neutral-300 rounded-xl p-2 gap-3 mt-1 focus-within:border-[#6365f1]">
                    <User className="w-4 h-4 text-neutral-500" />
                    <input
                      id="signup-name"
                      value={formData.name}
                      onChange={handleChange}
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="flex-1 outline-none text-neutral-800 bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-email"
                    className="text-neutral-800 font-semibold text-[15px]"
                  >
                    Email Address
                  </label>
                  <div className="flex items-center border border-neutral-300 rounded-xl p-2 gap-3 mt-1 focus-within:border-[#6365f1]">
                    <Mail className="w-4 h-4 text-neutral-500" />
                    <input
                      id="signup-email"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="flex-1 outline-none text-neutral-800 bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-password"
                    className="text-neutral-800 font-semibold text-[15px]"
                  >
                    Password
                  </label>
                  <div className="flex items-center border border-neutral-300 rounded-xl p-2 gap-3 mt-1 focus-within:border-[#6365f1]">
                    <Lock className="w-4 h-4 text-neutral-500" />
                    <input
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="flex-1 outline-none text-neutral-800 bg-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Sign Up <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-sm text-neutral-600">
          {tab === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setTab("signup")}
                className="text-[#6365f1] font-semibold hover:underline"
              >
                Sign up for free
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setTab("login")}
                className="text-[#6365f1] font-semibold hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>

      {/* Right Hero Div */}
      <div className="relative w-[60%] h-screen top-0 overflow-hidden">
        <img
          src={authHeroImg}
          alt="heroImg"
          className="w-full h-full object-cover object-[center_75%]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute right-20 top-15 p-4 rounded-2xl border-2 border-neutral-800 bg-neutral-900 flex items-center gap-3 hover:scale-[1.03] transition-transform duration-300">
          <div className="bg-indigo-600 text-white rounded-full flex items-center justify-center h-9 w-9 shrink-0">
            <Spotlight size={18} />
          </div>
          <h3 className="text-white text-[13px] font-bold">
            NEW DROP <br />
            <span className="text-neutral-400 font-normal">
              Global Tour: 2k26
            </span>
          </h3>
        </div>

        <div className="absolute bottom-20 left-20 w-[55%] flex flex-col gap-8">
          <div>
            <h1 className="text-white text-[55px]/[1.1] font-extrabold pb-1">
              Experience the
            </h1>
            <h1 className="italic text-indigo-600 text-[55px]/[1.1] font-extrabold pb-1">
              Best of Live
              <span className="not-italic text-white"> Events</span>
            </h1>
            <p className="text-neutral-400 w-full mt-4">
              Join a community of enthusiasts and get exclusive access to the
              most anticipated concerts, sports matches, and theatre
              performances worldwide.
            </p>
          </div>

          <div className="w-full h-px bg-neutral-800" />

          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-xl font-mono flex items-center gap-2 font-bold text-[#F4F6FF]">
                <ShieldCheck className="text-indigo-600" size={21} /> 100%
              </h2>
              <h3 className="text-[15px] font-medium text-neutral-300">
                Active Users
              </h3>
            </div>
            <div>
              <h2 className="text-xl font-mono flex items-center gap-2 font-bold text-[#F4F6FF]">
                <Users className="text-indigo-600" size={21} /> 2.5M+
              </h2>
              <h3 className="text-[15px] font-medium text-neutral-300">
                Global Venues
              </h3>
            </div>
            <div>
              <h2 className="text-xl font-mono flex items-center gap-2 font-bold text-[#F4F6FF]">
                <Lock className="text-indigo-600" size={21} /> Secure
              </h2>
              <h3 className="text-[15px] font-medium text-neutral-300">
                Customer Support
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
