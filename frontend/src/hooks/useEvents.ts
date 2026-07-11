import { useEffect, useState } from "react";
import type {
  CalendarEventByDate,
  CreateCalenderEvent,
} from "../types/CalenderEvents";

const useEvents = () => {
  const [eventsByDate, setEventsByDate] = useState<CalendarEventByDate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/events");
      const data = await response.json();
      setEventsByDate(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData: CreateCalenderEvent) => {
    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ?? "Failed to add event");
      }
      fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add events");
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ?? "Failed to delete event");
      }
      fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to devlete events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { eventsByDate, loading, error, addEvent, deleteEvent };
};

export default useEvents;
