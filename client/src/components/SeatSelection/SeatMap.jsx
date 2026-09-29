import { Armchair, Check, Clock, MousePointer2, User } from "lucide-react";
import Seat from "./Seat";
import { useBooking } from "../../context/BookingContext";

// a = available, b = booked, h = held, s = selected
const codes = {
  a: "available",
  b: "booked",
  h: "held",
  s: "selected",
};

const sections = [
  {
    name: "Premium Pit",
    rows: [
      { label: "A", left: "aabhaa", right: "abaaaa" },
      { label: "B", left: "aaaabb", right: "abaaab" },
      { label: "C", left: "abaaaa", right: "aabaaa" },
    ],
  },
  {
    name: "Front Orchestra",
    rows: [
      { label: "D", left: "aaaaaaaa", right: "haaaaaaa" },
      { label: "E", left: "baabbaaa", right: "babbaaaa" },
      { label: "F", left: "aaaaaaab", right: "abaaaaba" },
      { label: "G", left: "baaabaaa", right: "aaaabaaa" },
    ],
  },
  {
    name: "Back Orchestra",
    rows: [
      { label: "H", left: "aaahaaaab", right: "aaaaabaaa" },
      { label: "I", left: "aaaaaaaaa", right: "aaahaaaaa" },
      { label: "J", left: "aahaaaaaa", right: "babbaabab" },
      { label: "K", left: "aaaabaaaa", right: "baaaaahaa" },
      { label: "L", left: "baaaababb", right: "abbaaaabb" },
    ],
  },
];

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

// Component to render a single row of seats
const SeatRow = ({ row, sectionName, selectedSeats, toggleSeat }) => {
  // Helper to check if a specific seat is in our cart
  const isSelected = (seatNum) => 
    selectedSeats.some(s => s.section === sectionName && s.row === row.label && s.seat === seatNum.toString());

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="w-6 text-center text-xs font-mono text-neutral-400">
        {row.label}
      </span>
      <div className="flex gap-2">
        {row.left.split("").map((code, i) => {
          const seatNum = i + 1;
          // Override status to "selected" if it's in our cart!
          const status = isSelected(seatNum) ? "selected" : codes[code];
          return (
            <Seat 
              key={i} 
              status={status} 
              label={`${row.label}${seatNum}`} 
              onClick={() => toggleSeat({ section: sectionName, row: row.label, seat: seatNum.toString() })}
            />
          );
        })}
      </div>
      <div className="w-8" />
      <div className="flex gap-2">
        {row.right.split("").map((code, i) => {
          const seatNum = row.left.length + i + 1;
          const status = isSelected(seatNum) ? "selected" : codes[code];
          return (
            <Seat
              key={i}
              status={status}
              label={`${row.label}${seatNum}`}
              onClick={() => toggleSeat({ section: sectionName, row: row.label, seat: seatNum.toString() })}
            />
          );
        })}
      </div>
      <span className="w-6 text-center text-xs font-mono text-neutral-400">
        {row.label}
      </span>
    </div>
  );
};

const SeatMap = () => {
  const { selectedSeats, toggleSeat } = useBooking();

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-10">
      <div className="overflow-x-auto">
        <div className="min-w-[840px]">
          {/* Stage */}
          <div className="flex flex-col items-center">
            <div className="w-[660px] max-w-full bg-[#25272C] border-t-4 border-[#6365f1] rounded-2xl py-3.5 text-center text-white text-sm font-bold tracking-[0.5em] shadow-[0_20px_60px_-15px_rgba(99,101,241,0.35)]">
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
          <div className="flex flex-col gap-10 mt-12">
            {sections.map((section) => (
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
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

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
