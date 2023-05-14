const isUpperCaseLetter = (c : string) : boolean => {
  const ascii = c.charCodeAt(0);

  return ascii >= 65 && ascii <= 90;
};

export default isUpperCaseLetter;
