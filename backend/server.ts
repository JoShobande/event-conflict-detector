import express from "express";
import eventsRouter from "./src/routes/events";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/events", eventsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
