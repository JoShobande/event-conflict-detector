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
    // logic goes here
    // starttime of other event less than

    return true;
  }
}
