import { Router } from "express";
import { EventStore } from "../store/EventStore";

const router = Router();
const store = new EventStore();

router.post("/", (req, res) => {
  const { title, date, startTime, endTime } = req.body;
  if (!title || !date || !startTime || !endTime) {
    return res.status(400).json({ error: "Bad request" });
  }
  try {
    const newEvent = store.addEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: "Invalid event data" });
  }
});

router.get("/", (req, res) => {
  const allEvents = store.getAllGroupedByDate();
  res.json(allEvents);
});

router.get("/:date", (req, res) => {
  const events = store.getByDate(req.params.date);
  res.json(events);
});

router.delete("/:id", (req, res) => {
  const deletedEvent = store.removeEvent(req.params.id);
  if (!deletedEvent) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(deletedEvent);
});

export default router;
