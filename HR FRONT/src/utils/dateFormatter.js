export default function dateFormatter(date, format) {
  if (date !== null && date !== undefined) {
    if (format === "yyyy-mm-dd") {
      return (
        date.split("-")[2] + "-" + date.split("-")[1] + "-" + date.split("-")[0]
      );
    } else if (format === "dd-mm-yyyy") {
      return (
        date.split("-")[2] + "-" + date.split("-")[1] + "-" + date.split("-")[0]
      );
    }
  }
  return date;
}
