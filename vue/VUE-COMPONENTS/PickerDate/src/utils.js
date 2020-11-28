/*
 * @Author: shmao
 * @Date: 2020-11-28 14:49:24
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-28 18:00:31
 */
const getYearMonthDay = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return {
    year,
    month,
    day,
  };
};

const getDate = (year, month, day) => {
  return new Date(year, month, day);
};

export { getYearMonthDay, getDate };
