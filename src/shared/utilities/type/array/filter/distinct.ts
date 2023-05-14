const distinct = <T, >(array: T[]) : T[] => array.filter(
  (element, index, self) => self.indexOf(element) === index,
); // ou => [...new Set(array)]

export default distinct;
