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

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const totalEvents = groupedEvents.reduce(
    (sum, day) => sum + day.events.length,
    0,
  );

  const totalConflicts = groupedEvents.reduce(
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

      {groupedEvents.length === 0 ? (
        <p>No events yet. Add one above.</p>
      ) : (
        groupedEvents.map((day) => (
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
            groupedEvents.find((day) => day.date === selectedDate)?.events ?? []
          }
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default Timeline;
