import { useState } from "react";
import type { CalendarEventByDate } from "../types/CalenderEvents";
import DaySection from "./DaySection";
import DayDetailModal from "./DayDetailModal";

type TimelineProps = {
  groupedEvents: CalendarEventByDate[];
  onDelete: (id: string) => void;
};

const Timeline = ({ groupedEvents, onDelete }: TimelineProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [conflictsOnly, setConflictsOnly] = useState<boolean>(false);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const filteredGroupedEvents = conflictsOnly
    ? groupedEvents.filter((day) =>
        day.events.some((event) => event.conflictsWith.length > 0),
      )
    : groupedEvents;

  const totalEvents = filteredGroupedEvents.reduce(
    (sum, day) => sum + day.events.length,
    0,
  );

  const totalConflicts = filteredGroupedEvents.reduce(
    (sum, day) =>
      sum + day.events.filter((e) => e.conflictsWith.length > 0).length,
    0,
  );

  const busiestDay = groupedEvents.reduce<CalendarEventByDate | null>(
    (busiest, day) => {
      if (!busiest || day.events.length > busiest.events.length) {
        return day;
      }
      return busiest;
    },
    null,
  );

  return (
    <div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "16px",
        }}
      >
        <input
          type="checkbox"
          checked={conflictsOnly}
          onChange={(e) => setConflictsOnly(e.target.checked)}
        />
        Show conflicts only
      </label>
      <div className="summary-strip">
        <span>
          <strong>{totalEvents}</strong> events
        </span>
        <span>
          <strong>{totalConflicts}</strong> conflicts
        </span>
        <span>
          Busiest: <strong>{busiestDay ? busiestDay.date : "—"}</strong>
        </span>
      </div>

      {filteredGroupedEvents.length === 0 ? (
        <p>No events yet. Add one above.</p>
      ) : (
        filteredGroupedEvents.map((day) => (
          <DaySection
            key={day.date}
            date={day.date}
            events={day.events}
            onDelete={onDelete}
            onSelectDate={handleSelectDate}
          />
        ))
      )}

      {selectedDate && (
        <DayDetailModal
          date={selectedDate}
          events={
            filteredGroupedEvents.find((day) => day.date === selectedDate)
              ?.events ?? []
          }
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default Timeline;
