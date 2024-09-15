export const formatToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${month}.${day}`;
};

export const isInvalidSubmitDate = async (date) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const lastSubmit = new Date(date).setHours(0, 0, 0, 0);

  if (today - lastSubmit <= 604800000) {
    return false;
  }
  return true;
};
