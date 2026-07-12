import type { CalendarEvent } from "../types/CalenderEvents";
import EventCard from "./EventCard";

type DaySectionProps = {
  date: string;
  events: CalendarEvent[];
  onDelete: (id: string) => void;
  onSelectDate: (id: string) => void;
};

const DaySection = ({
  date,
  events,
  onDelete,
  onSelectDate,
}: DaySectionProps) => {
  const conflictCount = events.filter((e) => e.conflictsWith.length > 0).length;

  return (
    <div className="day-section">
      <div className="day-header" onClick={() => onSelectDate(date)}>
        <h3>{date}</h3>
        <span className="day-meta">
          {events.length} event{events.length !== 1 ? "s" : ""}
          {conflictCount > 0 &&
            ` · ${conflictCount} conflict${conflictCount !== 1 ? "s" : ""}`}
        </span>
      </div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default DaySection;
