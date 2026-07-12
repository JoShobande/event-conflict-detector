import type { CalendarEvent } from "../types/CalenderEvents";
import { timeToMinutes } from "../utils/timeToMinutes";

type DayDetailModalProps = {
  date: string;
  events: CalendarEvent[];
  onClose: () => void;
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const DayDetailModal = ({ date, events, onClose }: DayDetailModalProps) => {
  const eventsByHour = HOURS.map((hour) => {
    const hourEvents = events.filter((event) => {
      const startHour = Math.floor(timeToMinutes(event.startTime) / 60);
      return startHour === hour;
    });
    return { hour, events: hourEvents };
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{date}</h2>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="hour-grid">
          {eventsByHour.map(({ hour, events: hourEvents }) => (
            <div key={hour} className="hour-row">
              <span className="hour-label">
                {String(hour).padStart(2, "0")}:00
              </span>
              <div className="hour-events">
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`hour-event ${event.conflictsWith.length > 0 ? "conflicting" : ""}`}
                  >
                    {event.title} ({event.startTime}–{event.endTime})
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayDetailModal;
