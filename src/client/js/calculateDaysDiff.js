// calculateDaysDiff.js

function calculateDaysDiff(date1, date2) {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error("Both arguments must be Date objects.");
  }

  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 
  return diffDays;
}

export default calculateDaysDiff;