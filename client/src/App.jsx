import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { BookingProvider } from "./context/BookingContext";
import { ToastProvider } from "./context/ToastContext";
import { SearchProvider } from "./context/SearchContext";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy-loaded routes for code splitting
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/Auth/Login"));
const DiscoverEvents = lazy(() => import("./pages/DiscoverEvents"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const SeatSelection = lazy(() => import("./pages/SeatSelection"));
const Checkout = lazy(() => import("./pages/Checkout"));
const BookingSuccess = lazy(() => import("./pages/BookingSuccess"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const OrganizerDashboard = lazy(() => import("./pages/OrganizerDashboard"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const EditEvent = lazy(() => import("./pages/EditEvent"));
const MyEvents = lazy(() => import("./components/Organizer/MyEvents"));
const OrganizerAnalytics = lazy(() => import("./pages/OrganizerAnalytics"));
const OrganizerAttendees = lazy(() => import("./pages/OrganizerAttendees"));
const OrganizerDiscounts = lazy(() => import("./pages/OrganizerDiscounts"));
const NotFound = lazy(() => import("./pages/NotFound"));

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("evently_token");
  const user = JSON.parse(localStorage.getItem("evently_user") || "null");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <div className="min-h-screen flex flex-col bg-[#F6F7F9] text-neutral-900 selection:bg-indigo-500 selection:text-white">
        <BookingProvider>
          <SearchProvider>
            <ToastProvider>
              <ScrollToTop />
              <Suspense fallback={<LoadingSpinner message="Loading page..." fullScreen={true} />}>
                <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} />
              <Route path="/events">
                <Route index element={<DiscoverEvents />} />
                <Route path=":id" element={<EventDetails />} />
                <Route path=":id/seats" element={<SeatSelection />} />
                <Route
                  path=":id/seats/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id/seats/success"
                  element={
                    <ProtectedRoute>
                      <BookingSuccess />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                }
              />
              <Route path="/organizer">
                <Route
                  index
                  element={
                    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                      <OrganizerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="create"
                  element={
                    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                      <CreateEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="edit/:id"
                  element={
                    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                      <EditEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="events/edit/:id"
                  element={
                    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                      <EditEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="my-events"
                  element={
                    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                      <MyEvents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="analytics"
                  element={
                    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                      <OrganizerAnalytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="attendees"
                  element={
                    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                      <OrganizerAttendees />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="discounts"
                  element={
                    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                      <OrganizerDiscounts />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ToastProvider>
      </SearchProvider>
    </BookingProvider>
  </div>
</ReactLenis>
  );
};

export default App;
