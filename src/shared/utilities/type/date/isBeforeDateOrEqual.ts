const isBeforeDateOrEqual = (date: Date, lowerDate: Date) : boolean => date.getTime() <= lowerDate.getTime();

export default isBeforeDateOrEqual;
