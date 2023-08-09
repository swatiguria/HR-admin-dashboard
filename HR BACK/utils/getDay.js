export const getWeekDay = (date) => {
  const objdate = new Date(date);
  const day = objdate.getDay();
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return week[day];
};
