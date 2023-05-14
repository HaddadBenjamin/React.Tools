const toDictionary = <T, K, V>(
  array: T[],
  getKey: (element: T) => K,
  getElement?: (element: T) => V | T,
) : Map<K, V | T> => new Map<K, V | T>(
  array.map((element) => [
    getKey(element),
    getElement ? getElement(element) : element,
  ]));

export default toDictionary;
