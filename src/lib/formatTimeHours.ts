export const formatTimeHoursMinute = (date: string) => {
  const dateTime = new Date(date);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
