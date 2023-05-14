const isBeforeDate = (date: Date, beforeDate: Date) : boolean => date.getTime() < beforeDate.getTime();

export default isBeforeDate;
