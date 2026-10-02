import Seat from "./Seat";

// Component to render a single row of seats

const SeatRow = ({
  row,
  sectionName,
  selectedSeats,
  toggleSeat,
  seatLookup,
}) => {
  // Helper to check if a specific seat is in our cart
  const isSelected = (seatNum) =>
    selectedSeats.some(
      (s) =>
        s.section === sectionName &&
        s.row === row.label &&
        s.seat === seatNum.toString(),
    );

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="w-6 text-center text-xs font-mono text-neutral-400">
        {row.label}
      </span>
      <div className="flex gap-2">
        {row.left.map((seat) => {
          let finalStatus = seat.status;
          if (seat.status === "available" && isSelected(seat.col)) {
            finalStatus = "selected";
          } else {
            finalStatus = seat.status;
          }
          return (
            <Seat
              key={seat.col}
              status={finalStatus}
              label={`${row.label}${seat.col}`}
              onClick={() =>
                toggleSeat({
                  section: sectionName,
                  row: row.label,
                  seat: seat.col.toString(),
                  id: seat.id,
                })
              }
            />
          );
        })}
      </div>
      <div className="w-8" />
      <div className="flex gap-2">
        {row.right.map((seat) => {
          let finalStatus = seat.status;
          if (seat.status === "available" && isSelected(seat.col)) {
            finalStatus = "selected";
          } else {
            finalStatus = seat.status;
          }
          return (
            <Seat
              key={seat.col}
              status={finalStatus}
              label={`${row.label}${seat.col}`}
              onClick={() =>
                toggleSeat({
                  section: sectionName,
                  row: row.label,
                  seat: seat.col.toString(),
                  id: seat.id,
                })
              }
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

export default SeatRow;
