const isDigit = (c: string): boolean => {
  const ascii = c.charCodeAt(0);

  return ascii >= 48 && ascii <= 57;
};

export default isDigit;
