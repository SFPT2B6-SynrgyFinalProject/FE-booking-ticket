export const formatDateString = (dateTimeString: string): string => {
  const dateTime = new Date(dateTimeString);
  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const dayOfWeek = daysOfWeek[dateTime.getDay()];
  const day = dateTime.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ags",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const month = monthNames[dateTime.getMonth()];
  const year = dateTime.getFullYear();

  return `${dayOfWeek}, ${day} ${month} ${year}`;
};
