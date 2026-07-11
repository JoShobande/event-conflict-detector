export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  conflictsWith: string[];
};

export type CalendarEventByDate = {
  date: string;
  events: CalendarEvent[];
};

export type CreateCalenderEvent = {
  title: string;
  date: string;
  startTime: string;
};
