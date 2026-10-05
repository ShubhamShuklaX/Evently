import { Routes, Route, Navigate } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import EventDetails from "./pages/EventDetails";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import DiscoverEvents from "./pages/DiscoverEvents";
import SeatSelection from "./pages/SeatSelection";
import Checkout from "./pages/Checkout";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import MyEvents from "./components/Organizer/MyEvents";
import OrganizerAnalytics from "./pages/OrganizerAnalytics";
import OrganizerAttendees from "./pages/OrganizerAttendees";
import OrganizerDiscounts from "./pages/OrganizerDiscounts";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

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
    <div>
      <BookingProvider>
        <ScrollToTop />
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
      </BookingProvider>
    </div>
  );
};

export default App;
