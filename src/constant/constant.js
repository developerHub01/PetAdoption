export const serverApi = "http://localhost:5000";
export const primaryColor = "rgba(63, 65, 26, 1)";
export const secondaryColor = "#ffffff";
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const handleTimeFormatFromUTC = (time) => {
  time = time.split("T")[0].split("-");
  return `${time[2] < 10 ? "0" + +time[2] : time[2]} ${months[time[1] - 1]} ${
    time[0]
  }`;
};
