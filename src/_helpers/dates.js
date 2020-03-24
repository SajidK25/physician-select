import moment from "moment";

export const formatDate = date => {
  if (!date) return "";

  return moment(date).format("MM/DD/YYYY");
};

export const fromDate = date => {
  if (!date) return "";

  return moment(date).fromNow();
};

export const calculateDeadline = date => {
  if (!date) return 0;

  // deadline is 24 hours (60 * 24) minutes
  return moment().diff(moment(date).add(1440, "minutes"), "minutes");
};
