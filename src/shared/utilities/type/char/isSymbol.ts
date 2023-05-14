/* ASCII codes 33-47: !"#$%&'()*+,-./
   ASCII codes 58-64: :;<=>?@
   ASCII codes 91-96: []^_`
   ASCII codes 123-126: {|}~ */
const isSymbol = (c: string): boolean => {
  const ascii = c.charCodeAt(0);

  return (
    (ascii >= 33 && ascii <= 47)
        || (ascii >= 58 && ascii <= 64)
        || (ascii >= 91 && ascii <= 96)
        || (ascii >= 123 && ascii <= 126)
  );
};

export default isSymbol;
