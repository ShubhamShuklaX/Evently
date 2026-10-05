import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingCard from "../components/MyBookings/BookingCard";
import BookingStats from "../components/MyBookings/BookingStats";
import BookingToolbar from "../components/MyBookings/BookingToolbar";
import QuickLinks from "../components/MyBookings/QuickLinks";
import PromoBanner from "../components/MyBookings/PromoBanner";
import { API_BASE } from "../utils/api";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
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
      }
    }

    void fetchOrders();
  }, []);

  const formattedBookings = Array.isArray(orders)
    ? orders.map((order) => {
        const firstSeatEvent = order.seats?.[0]?.event;

        return {
          orderId: `EVT-${order.id.slice(0, 8).toUpperCase()}`,
          status: "upcoming",
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

  const tabs = ["Upcoming", "Past", "Cancelled", "All Bookings"];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <Header />

      <main className="grow max-w-7xl w-full mx-auto px-6 py-12">
        <BookingStats liveBookings={formattedBookings} />

        <BookingToolbar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Bookings List */}
        <div className="flex flex-col gap-6 mb-16">
          {formattedBookings.map((booking) => (
            <BookingCard key={booking.orderId} booking={booking} />
          ))}
        </div>

        <QuickLinks />
        <PromoBanner />
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
