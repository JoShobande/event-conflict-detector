import { useState, type FormEvent } from "react";
import type { CreateCalenderEvent } from "../types/CalenderEvents";
import { timeToMinutes } from "../utils/timeToMinutes";

type EventFormProps = {
  onSubmit: (data: CreateCalenderEvent) => void;
};

const EventForm = ({ onSubmit }: EventFormProps) => {
  const [formData, setFormData] = useState<CreateCalenderEvent>({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (field: keyof CreateCalenderEvent, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (timeToMinutes(formData.startTime) >= timeToMinutes(formData.endTime)) {
      setValidationError("End time must be after start time");
      return;
    }

    setValidationError(null);
    onSubmit(formData);
    setFormData({ title: "", date: "", startTime: "", endTime: "" });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="startTime">Start Time</label>
        <input
          id="startTime"
          type="time"
          value={formData.startTime}
          onChange={(e) => handleChange("startTime", e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="endTime">End Time</label>
        <input
          id="endTime"
          type="time"
          value={formData.endTime}
          onChange={(e) => handleChange("endTime", e.target.value)}
          required
        />
      </div>

      {validationError && <p className="form-error">{validationError}</p>}

      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
