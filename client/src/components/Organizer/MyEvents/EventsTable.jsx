import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ExternalLink,
  Pencil,
  Trash2,
  AlertTriangle,
  Plus,
  Clock,
  Loader2,
} from "lucide-react";

const statusStyles = {
  Live: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Draft: "bg-amber-50 text-amber-700 border border-amber-200",
  Past: "bg-neutral-100 text-neutral-500 border border-neutral-200",
};

const EventsTable = ({ myEvents = [], onDeleteEvent }) => {
  const navigate = useNavigate();
  const [eventToDelete, setEventToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (eventToDelete && onDeleteEvent) {
      try {
        setDeleting(true);
        await onDeleteEvent(eventToDelete.id);
      } finally {
        setDeleting(false);
        setEventToDelete(null);
      }
    }
  };

  return (
    <>
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Column headers */}
        <div className="grid grid-cols-[2.5fr_1.2fr_1fr_1fr_1fr_120px] gap-4 px-6 py-3.5 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <span>Event & Category</span>
          <span>Date & Time</span>
          <span>Tickets / Capacity</span>
          <span>Pricing</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Empty state */}
        {myEvents.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <CalendarDays size={28} />
            </div>
            <h3 className="text-lg font-bold text-neutral-800">
              No events found
            </h3>
            <p className="text-sm text-neutral-500 mt-1 max-w-sm mx-auto mb-6">
              You haven't listed any events matching your criteria yet.
            </p>
            <Link
              to="/organizer/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6365f1] hover:bg-[#4f51e9] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <Plus size={16} />
              Create First Event
            </Link>
          </div>
        ) : (
          /* Rows */
          <div className="divide-y divide-neutral-100">
            {myEvents.map((event) => {
              const capacity = Number(event.capacity) || 100;
              const sold =
                typeof event.soldCount === "number"
                  ? event.soldCount
                  : Math.round(capacity * 0.4);
              const price = Number(event.price) || 0;

              return (
                <div
                  key={event.id}
                  className="grid grid-cols-[2.5fr_1.2fr_1fr_1fr_1fr_120px] gap-4 px-6 py-4 items-center hover:bg-neutral-50/80 transition-colors group"
                >
                  {/* Event Title & Thumbnail */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={
                        event.img ||
                        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=120&auto=format&fit=crop&q=80"
                      }
                      alt={event.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-neutral-200"
                    />
                    <div className="min-w-0">
                      <Link
                        to={`/organizer/events/edit/${event.id}`}
                        className="font-bold text-[#1D1F23] hover:text-[#6365f1] transition-colors line-clamp-1 text-sm block"
                        title={event.title}
                      >
                        {event.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-medium text-neutral-400 capitalize bg-neutral-100 px-2 py-0.5 rounded-md">
                          {event.category || "General"}
                        </span>
                        <span className="text-[11px] text-neutral-400 truncate max-w-30">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="text-sm text-neutral-600">
                    <span className="flex items-center gap-1.5 font-medium text-[#1D1F23]">
                      <CalendarDays
                        size={14}
                        className="text-neutral-400 shrink-0"
                      />
                      {event.date || "TBD"}
                    </span>
                    {event.time && (
                      <span className="flex items-center gap-1 text-xs text-neutral-400 mt-0.5">
                        <Clock size={12} className="shrink-0" />
                        {event.time}
                      </span>
                    )}
                  </div>

                  {/* Tickets / Capacity */}
                  <div>
                    <span className="text-sm font-semibold text-[#1D1F23]">
                      {sold}{" "}
                      <span className="font-normal text-neutral-400">
                        / {capacity}
                      </span>
                    </span>
                    <div className="w-24 h-1.5 bg-neutral-200 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full bg-[#6365f1] rounded-full"
                        style={{
                          width: `${Math.min(100, Math.round((sold / capacity) * 100))}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <span className="text-sm font-bold text-[#1D1F23]">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                    <span className="block text-[11px] text-neutral-400">
                      per ticket
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[event.status] || statusStyles.Live
                      }`}
                    >
                      {event.status || "Live"}
                    </span>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      title="Edit Event"
                      onClick={() =>
                        navigate(`/organizer/events/edit/${event.id}`)
                      }
                      className="p-2 text-neutral-500 hover:text-[#6365f1] hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Pencil size={15} />
                    </button>

                    <Link
                      to={`/events/${event.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Public Page"
                      className="p-2 text-neutral-500 hover:text-indigo-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <ExternalLink size={15} />
                    </Link>

                    <button
                      type="button"
                      title="Delete Event"
                      onClick={() => setEventToDelete(event)}
                      className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Delete */}
      {eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">
              Delete Event?
            </h3>
            <p className="text-sm text-neutral-500 mt-2">
              Are you sure you want to remove{" "}
              <strong className="text-neutral-800">
                "{eventToDelete.title}"
              </strong>
              ? This action cannot be undone on the dashboard.
            </p>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setEventToDelete(null)}
                className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="px-5 py-2 text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    Deleting...
                  </>
                ) : (
                  "Delete Event"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventsTable;
