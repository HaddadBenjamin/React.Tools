const isLowerCaseLetter = (c : string) : boolean => {
  const ascii = c.charCodeAt(0);

  return ascii >= 97 && ascii <= 122;
};

export default isLowerCaseLetter;
