// This function will return Month and Year in a string format
export const getDateInRequiredFormat = (date) => {
  const dateObj = new Date(date);
  const requiredFormat = dateObj.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  return requiredFormat;
};
