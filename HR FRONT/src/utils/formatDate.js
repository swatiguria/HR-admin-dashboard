export const formatDate = (date) => {

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let newDate =
    year +
    "-" +
    (month > 10 ? month : "0" + month) +
    "-" +
    (day > 10 ? day : "0" + day);
  return newDate;
};
