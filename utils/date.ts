export const getDateText = (dateStr: string): string => {
  const dateObj = new Date(dateStr);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  return `${year}年${month}月${date}日`;
};
