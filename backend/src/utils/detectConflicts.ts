import { CalendarEvent } from "../models/CalendarEvent";
import { timeToMinutes } from "./timeToMinutes";

export const detectConflicts = (events: CalendarEvent[]) => {
  let sortedEvents = events.sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
  );
  for (let i = 0; i < sortedEvents.length; i++) {
    for (let j = 0; j < i; j++) {
      if (sortedEvents[i].overlaps(sortedEvents[j])) {
        sortedEvents[i].conflictsWith.push(sortedEvents[j].id);
        sortedEvents[j].conflictsWith.push(sortedEvents[i].id);
      }
    }
  }
  return sortedEvents;
};
