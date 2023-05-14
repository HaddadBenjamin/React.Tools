import distinct from '../filter/distinct';
import distinctBy from '../filter/distinctBy';

const addRangeWithoutDuplicate = <T, >(
  array: T[],
  elements: T[],
  comparator?: (a : T, b : T) => boolean) : T[] => {
  const result = [...array, ...elements];

  if (!comparator) return distinct(result);
  return distinctBy(result, comparator);
};

export default addRangeWithoutDuplicate;
