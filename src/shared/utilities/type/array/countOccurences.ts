import mapToArray, { IKeyValue } from '../map/mapToArray';

const countOccurences = <T, >(array: T[]) : IKeyValue<T, number>[] => {
  const occurencesMap = new Map<T, number>();

  array.forEach((element) => occurencesMap.set(element, (occurencesMap.get(element) || 0) + 1));

  return mapToArray(occurencesMap);
};

export default countOccurences;
