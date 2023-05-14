const isAfterDateOrEqual = (date: Date, afterDate: Date) : boolean => date.getTime() >= afterDate.getTime();

export default isAfterDateOrEqual;
