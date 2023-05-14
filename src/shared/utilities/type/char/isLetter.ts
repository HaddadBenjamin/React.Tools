const isLetter = (c : string) : boolean => {
  const ascii = c.charCodeAt(0);

  return (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122);
};

export default isLetter;
