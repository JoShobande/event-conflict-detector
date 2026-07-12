import { CalendarEvent, CalendarEventData } from "../models/CalendarEvent";
import { detectConflicts } from "../utils/detectConflicts";

export class EventStore {
  #events: Map<string, CalendarEvent> = new Map();
  #byDate: Map<string, Set<string>> = new Map();

  addEvent(data: CalendarEventData) {
    const event = { ...data, id: crypto.randomUUID() };
    const newEvent = new CalendarEvent(event);
    this.#events.set(newEvent.id, newEvent);
    if (!this.#byDate.has(newEvent.date)) {
      this.#byDate.set(newEvent.date, new Set<string>());
    }
    this.#byDate.get(newEvent.date)?.add(newEvent.id);
    this.#recalculateConflicts(newEvent.date);
    return newEvent;
  }

  #recalculateConflicts(dateKey: string) {
    const ids = [...(this.#byDate.get(dateKey) ?? new Set())];
    const events = ids
      .map((id) => this.#events.get(id))
      .filter((event): event is CalendarEvent => event !== undefined);

    return detectConflicts(events);
  }

  removeEvent(id: string) {
    const eventToRemove = this.#events.get(id);
    if (!eventToRemove) {
      return undefined;
    }
    this.#events.delete(id);
    this.#byDate.get(eventToRemove.date)?.delete(id);

    const bucket = this.#byDate.get(eventToRemove.date);
    if (bucket && bucket.size === 0) {
      this.#byDate.delete(eventToRemove.date);
    }

    this.#recalculateConflicts(eventToRemove.date);
    return eventToRemove;
  }

  getByDate(dateKey: string) {
    const ids = [...(this.#byDate.get(dateKey) ?? new Set())];
    const events = ids
      .map((id) => this.#events.get(id))
      .filter((event): event is CalendarEvent => event !== undefined);

    return events;
  }

  getAllGroupedByDate() {
    return [...this.#byDate].map(([date, idSet]) => {
      const events = [...idSet]
        .map((id) => this.#events.get(id))
        .filter((event): event is CalendarEvent => event !== undefined);

      return { date, events };
    });
  }
}
