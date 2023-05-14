const removeDuplicateBy = <T>(array: T[], comparator: (a : T, b : T) => boolean) : T[] => {
  const distinctElements: T[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const element of array) if (!distinctElements.find((distinctElement) => comparator(element, distinctElement))) distinctElements.push(element);

  return distinctElements;
};

export default removeDuplicateBy;
