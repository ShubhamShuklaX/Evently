import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingCard from "../components/MyBookings/BookingCard";
import BookingStats from "../components/MyBookings/BookingStats";
import BookingToolbar from "../components/MyBookings/BookingToolbar";
import QuickLinks from "../components/MyBookings/QuickLinks";
import PromoBanner from "../components/MyBookings/PromoBanner";
import LoadingSpinner from "../components/LoadingSpinner";
import { Ticket, ArrowRight } from "lucide-react";
import { API_BASE } from "../utils/api";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const token = localStorage.getItem("evently_token");

        const response = await fetch(`${API_BASE}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok && Array.isArray(data.myOrders)) {
          setOrders(data.myOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    void fetchOrders();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formattedBookings = Array.isArray(orders)
    ? orders.map((order) => {
        const firstSeatEvent = order.seats?.[0]?.event;
        const eventDate = firstSeatEvent?.date ? new Date(firstSeatEvent.date) : null;
        const isPast =
          eventDate && !Number.isNaN(eventDate.getTime()) ? eventDate < today : false;
        const isCancelled = order.status === "cancelled";

        let calculatedStatus = "upcoming";
        if (isCancelled) calculatedStatus = "cancelled";
        else if (isPast) calculatedStatus = "past";

        return {
          orderId: `EVT-${order.id.slice(0, 8).toUpperCase()}`,
          status: calculatedStatus,
          totalPaid: order.totalPaid,
          seats: (order.seats || []).map((s) => ({
            section: "General",
            row: s.row,
            seat: s.col,
          })),
          event: {
            id: firstSeatEvent?.id,
            title: firstSeatEvent?.title || "Event",
            date: firstSeatEvent?.date || "TBD",
            time: firstSeatEvent?.time || "TBD",
            venue: firstSeatEvent?.location || "Venue",
            image: firstSeatEvent?.img || "",
            category: firstSeatEvent?.category || "Music",
          },
        };
      })
    : [];

  const filteredBookings = formattedBookings.filter((booking) => {
    if (activeTab === "Upcoming") return booking.status === "upcoming";
    if (activeTab === "Past") return booking.status === "past";
    if (activeTab === "Cancelled") return booking.status === "cancelled";
    return true; // "All Bookings"
  });

  const tabs = ["Upcoming", "Past", "Cancelled", "All Bookings"];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <Header />

      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <BookingStats liveBookings={formattedBookings} />

        <BookingToolbar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Bookings List or Spinner */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <LoadingSpinner message="Fetching your tickets & reservations..." fullScreen={false} />
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="flex flex-col gap-6 mb-16">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.orderId} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center my-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-[#6365f1] flex items-center justify-center mx-auto mb-4">
              <Ticket size={28} />
            </div>
            <h3 className="text-xl font-bold text-neutral-800">
              No {activeTab.toLowerCase()} bookings found
            </h3>
            <p className="text-neutral-500 text-sm mt-1 max-w-sm mx-auto mb-6">
              {activeTab === "Past"
                ? "You haven't attended any past events yet."
                : activeTab === "Cancelled"
                ? "You have no cancelled ticket reservations."
                : "You have no upcoming experiences booked. Explore what's trending now!"}
            </p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#6365f1] hover:bg-[#4f51e9] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              Discover Events <ArrowRight size={16} />
            </Link>
          </div>
        )}

        <QuickLinks />
        <PromoBanner />
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;

