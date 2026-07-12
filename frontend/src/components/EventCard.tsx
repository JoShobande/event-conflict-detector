import { useState } from "react";
import type { CalendarEvent } from "../types/CalenderEvents";

type EventCardProps = {
  event: CalendarEvent;
  onDelete: (id: string) => void;
};

const EventCard = ({ event, onDelete }: EventCardProps) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false);
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

      {isConfirmingDelete ? (
        <span className="confirm-delete">
          <button className="confirm-btn" onClick={() => onDelete(event.id)}>
            Confirm
          </button>
          <button
            className="cancel-btn"
            onClick={() => setIsConfirmingDelete(false)}
          >
            Cancel
          </button>
        </span>
      ) : (
        <button
          className="delete-btn"
          onClick={() => setIsConfirmingDelete(true)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default EventCard;
