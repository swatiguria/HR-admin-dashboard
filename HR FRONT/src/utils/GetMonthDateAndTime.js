const GetMonthDateAndTime = () => {
  function monthFormat(month) {
    let monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthArr[Number(month) - 1];
  }
  function dateFormat(item) {
    let monthObj = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };
    let a = item.split("-")[0].trim().split(" ");
    let b = item.split("-")[1].trim().split(" ");
    Object.keys(monthObj).forEach((key) => {
      if (a[1] === key) a[1] = monthObj[key];
      if (b[1] === key) b[1] = monthObj[key];
    });
    item =
      a[0] + "-" + a[1] + "-" + a[2] + " to " + b[0] + "-" + b[1] + "-" + b[2];
    return item;
  }

  function timeFormat(date) {
    let hours = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let result = hours + ":" + minutes + " " + ampm;
    return result;
  }

  return {
    monthFormat,
    dateFormat,
    timeFormat,
  };
};

export default GetMonthDateAndTime;
