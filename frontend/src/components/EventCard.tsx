import type { CalendarEvent } from "../types/CalenderEvents";

type EventCardProps = {
  event: CalendarEvent;
  onDelete: (id: string) => void;
};

const EventCard = ({ event, onDelete }: EventCardProps) => {
  const isConflicting = event.conflictsWith.length > 0;

  return (
    <div
      className={`event-card ${isConflicting ? "conflicting" : ""}`}
      title={
        isConflicting
          ? `Conflicts with ${event.conflictsWith.length} other event(s)`
          : undefined
      }
    >
      <span className="event-time">
        {event.startTime}–{event.endTime}
      </span>
      <span className="event-title">{event.title}</span>
      {isConflicting && <span className="conflict-flag">Conflict</span>}
      <button className="delete-btn" onClick={() => onDelete(event.id)}>
        Delete
      </button>
    </div>
  );
};

export default EventCard;
