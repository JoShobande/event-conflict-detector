import useEvents from "./hooks/useEvents";
import EventForm from "./components/EventForm";
import Timeline from "./components/Timeline";

function App() {
  const { eventsByDate, loading, error, addEvent, deleteEvent } = useEvents();

  return (
    <div className="app-shell">
      <h1 className="app-title">Event Conflict Detector</h1>
      <p className="app-subtitle">
        Schedule events and catch overlaps automatically.
      </p>

      <EventForm onSubmit={addEvent} />

      {error && <p className="form-error">{error}</p>}

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <Timeline groupedEvents={eventsByDate} onDelete={deleteEvent} />
      )}
    </div>
  );
}

export default App;
