const rangeBetween = (minimum: number, maximum: number) : number[] => {
  const result = [];
  // eslint-disable-next-line no-plusplus
  for (let i = minimum; i <= maximum; i++) result.push(i);

  return result;
};

export default rangeBetween;
