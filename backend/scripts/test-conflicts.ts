import { CalendarEvent } from "../src/models/CalendarEvent"; // adjust path to match your structure
import { detectConflicts } from "../src/utils/detectConflicts";

// Test 1: two overlapping events
const test1 = [
  new CalendarEvent({ id: "1", title: "Meeting A", date: "2026-07-09", startTime: "09:00", endTime: "10:00" }),
  new CalendarEvent({ id: "2", title: "Meeting B", date: "2026-07-09", startTime: "09:30", endTime: "10:30" }),
];
console.log("Test 1 (should conflict):", detectConflicts(test1).map(e => ({ id: e.id, conflictsWith: e.conflictsWith })));

// Test 2: back-to-back, NOT conflicting
const test2 = [
  new CalendarEvent({ id: "1", title: "Meeting A", date: "2026-07-09", startTime: "09:00", endTime: "10:00" }),
  new CalendarEvent({ id: "2", title: "Meeting B", date: "2026-07-09", startTime: "10:00", endTime: "11:00" }),
];
console.log("Test 2 (should NOT conflict):", detectConflicts(test2).map(e => ({ id: e.id, conflictsWith: e.conflictsWith })));

// Test 3: same start time
const test3 = [
  new CalendarEvent({ id: "1", title: "Meeting A", date: "2026-07-09", startTime: "09:00", endTime: "10:00" }),
  new CalendarEvent({ id: "2", title: "Meeting B", date: "2026-07-09", startTime: "09:00", endTime: "09:30" }),
];
console.log("Test 3 (should conflict):", detectConflicts(test3).map(e => ({ id: e.id, conflictsWith: e.conflictsWith })));

// Test 4: fully nested (your A/B/C case)
const test4 = [
  new CalendarEvent({ id: "A", title: "A", date: "2026-07-09", startTime: "09:00", endTime: "11:00" }),
  new CalendarEvent({ id: "B", title: "B", date: "2026-07-09", startTime: "09:15", endTime: "09:45" }),
  new CalendarEvent({ id: "C", title: "C", date: "2026-07-09", startTime: "09:20", endTime: "10:30" }),
];
console.log("Test 4 (A-B-C, A should conflict w/ both, B & C should conflict w/ each other too):", 
  detectConflicts(test4).map(e => ({ id: e.id, conflictsWith: e.conflictsWith })));