const stringToNumber = (text? : string, defaultValue : number | undefined = 0) : number | undefined => {
  if (!text) return defaultValue;

  const number = parseInt(text, 10);

  return Number.isNaN(number) ? defaultValue : number;
};

export default stringToNumber;
