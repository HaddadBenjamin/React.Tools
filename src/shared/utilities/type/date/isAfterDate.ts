const isAfterDate = (date: Date, afterDate: Date) : boolean => date.getTime() > afterDate.getTime();

export default isAfterDate;
