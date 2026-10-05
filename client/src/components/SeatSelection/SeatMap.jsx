import { Armchair, Check, Clock, Loader2, MousePointer2, User } from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import SeatRow from "./SeatRow";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../../utils/api";

const legend = [
  {
    label: "Available",
    icon: Armchair,
    style: "bg-emerald-50 border-emerald-200 text-emerald-600",
  },
  {
    label: "Selected",
    icon: Check,
    style: "bg-[#6365f1] border-[#6365f1] text-white",
  },
  {
    label: "Held",
    icon: Clock,
    style: "bg-amber-50 border-amber-200 text-amber-500",
  },
  {
    label: "Booked",
    icon: User,
    style: "bg-neutral-100 border-neutral-200 text-neutral-400",
  },
];

const SeatMap = () => {
  const { id } = useParams();
  const { selectedSeats, setSelectedSeats, toggleSeat } = useBooking();
  const [dbSeats, setDbSeats] = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoadingSeats(true);
        const response = await fetch(`${API_BASE}/api/seats/${id}`);
        const data = await response.json();
        setDbSeats(data);
        setSelectedSeats((prevSeats) => {
          return prevSeats.filter((cartSeat) => {
            const dbSeat = data.find((d) => d.id === cartSeat.id);
            if (dbSeat?.status === "available") return true;
          });
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSeats(false);
      }
    };
    if (id) void fetchSeats();
  }, [id, setSelectedSeats]);

  const seatLookup = {};
  dbSeats.forEach((s) => {
    seatLookup[`${s.row}-${s.col}`] = s.status;
  });

  // Step 1: Group the flat array into rows
  const groupedRows = {};
  dbSeats.forEach((seat) => {
    if (!groupedRows[seat.row]) groupedRows[seat.row] = [];
    groupedRows[seat.row].push(seat);
  });

  // Step 2: Sort row labels (A, B, C...) and sort seats inside each row by column
  const sortedRowLabels = Object.keys(groupedRows).sort((a, b) =>
    a.localeCompare(b),
  );
  sortedRowLabels.forEach((label) => {
    groupedRows[label].sort((a, b) => a.col - b.col);
  });

  // Step 3: Divide rows evenly into 3 sections
  const sectionNames = ["Premium Pit", "Front Orchestra", "Back Orchestra"];
  const rowsPerSection = Math.ceil(sortedRowLabels.length / 3);

  const dynamicSections = sectionNames
    .map((name, i) => {
      const sectionRowLabels = sortedRowLabels.slice(
        i * rowsPerSection,
        (i + 1) * rowsPerSection,
      );
      return {
        name,
        rows: sectionRowLabels.map((label) => {
          const seats = groupedRows[label];
          const mid = Math.ceil(seats.length / 2);
          return {
            label,
            left: seats.slice(0, mid), // First half of seats
            right: seats.slice(mid), // Second half of seats
          };
        }),
      };
    })
    .filter((section) => section.rows.length > 0); // Remove empty sections

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-10">
      <div className="overflow-x-auto">
        <div className="min-w-210">
          {/* Stage */}
          <div className="flex flex-col items-center">
            <div className="w-165 max-w-full bg-[#25272C] border-t-4 border-[#6365f1] rounded-2xl py-3.5 text-center text-white text-sm font-bold tracking-[0.5em] shadow-[0_20px_60px_-15px_rgba(99,101,241,0.35)]">
              STAGE
            </div>
            <div className="flex items-center gap-3 mt-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400">
              <span className="w-12 h-px bg-neutral-300" />
              Audience Facing
              <span className="w-12 h-px bg-neutral-300" />
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {legend.map(({ label, icon: Icon, style }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-3 py-1.5"
              >
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${style}`}
                >
                  <Icon size={11} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Sections */}
          {loadingSeats ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <Loader2 size={32} className="animate-spin text-[#6365f1]" />
              <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold animate-pulse">
                Loading Venue Layout & Available Seats...
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-10 mt-12">
              {dynamicSections.map((section) => (
                <div key={section.name}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-px bg-neutral-200 flex-1" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-400">
                      {section.name}
                    </span>
                    <div className="h-px bg-neutral-200 flex-1" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {section.rows.map((row) => (
                      <SeatRow
                        key={row.label}
                        row={row}
                        sectionName={section.name}
                        selectedSeats={selectedSeats}
                        toggleSeat={toggleSeat}
                        seatLookup={seatLookup}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hint */}
          <div className="flex justify-end mt-8">
            <span className="flex items-center gap-2 border border-neutral-200 rounded-full px-4 py-2 text-xs text-neutral-500">
              <MousePointer2 size={13} />
              Click a seat to select
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
