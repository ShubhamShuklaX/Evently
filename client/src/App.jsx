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
import MyEvents from "./components/Organizer/MyEvents";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  // Replace this with your actual auth logic (e.g., Context/Redux)
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <div>
      <BookingProvider>
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
                <ProtectedRoute>
                  <OrganizerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-events"
              element={
                <ProtectedRoute>
                  <MyEvents />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BookingProvider>
    </div>
  );
};

export default App;
