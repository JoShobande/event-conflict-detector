import { timeToMinutes } from "../utils/timeToMinutes";

export type CalendarEventData = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
};

export class CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  conflictsWith: string[];

  constructor(data: CalendarEventData) {
    this.id = data.id;
    this.title = data.title;
    this.date = data.date;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.conflictsWith = [];
  }

  overlaps(otherEvent: CalendarEvent): boolean {
    let isConflict =
      timeToMinutes(this.startTime) < timeToMinutes(otherEvent.endTime) &&
      timeToMinutes(otherEvent.startTime) < timeToMinutes(this.endTime);

    return isConflict;
  }
}
