export const formatToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${month}.${day}`;
};

export const isInvalidSubmitDate = async (date) => {
  // node.js는 UTC 시간대를 사용하므로 한국 시간으로 변경하기 위해 32400000ms를 더합니다.
  // 32400000ms는 9시간을 의미합니다.
  const submitExist = date !== "none";
  if (!submitExist) {
    return true;
  }

  const today = new Date().setHours(0, 0, 0, 0);
  const lastSubmit = new Date(date).setHours(0, 0, 0, 0);

  // 오늘 날짜와 제출한 날짜의 기간 차이가 일주일 내인지 확인합니다.
  if (today - lastSubmit <= 604800000) {
    return false;
  }
  return true;
};
