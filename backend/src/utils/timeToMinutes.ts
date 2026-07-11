export const timeToMinutes = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const minutesSinceMidnight = hours * 60 + minutes;
  return minutesSinceMidnight;
};
