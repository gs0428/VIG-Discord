export const formatToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${month}.${day}`;
};

const TWO_WEEKS = 1209600000;
const DAY = 86400000;

export const isInvalidSubmitDate = async (date, sunday = false) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const lastSubmit = new Date(date).setHours(0, 0, 0, 0);

  let time = TWO_WEEKS;
  if (sunday) time = TWO_WEEKS - DAY;

  return today - lastSubmit > time;
};
