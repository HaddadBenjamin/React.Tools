const isBetweenDate = (date: Date, minimalDate: Date, maximalDate: Date) : boolean => date.getTime() > minimalDate.getTime() && date.getTime() < maximalDate.getTime();

export default isBetweenDate;
