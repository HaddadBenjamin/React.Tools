const dateNowWithoutTime = (date?: string) : Date => {
  const dateNow = date ? new Date(date) : new Date();

  dateNow.setHours(0, 0, 0, 0);

  return dateNow;
};

export default dateNowWithoutTime;
