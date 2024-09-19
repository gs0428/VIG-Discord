export const formatToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${month}.${day}`;
};

const WEEK = 604800000;
const DAY = 86400000;

export const isInvalidSubmitDate = async (date, long = false) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const lastSubmit = new Date(date).setHours(0, 0, 0, 0);

  let time = WEEK;
  if (long) time = WEEK * 2 - DAY;

  return today - lastSubmit > time;
};
