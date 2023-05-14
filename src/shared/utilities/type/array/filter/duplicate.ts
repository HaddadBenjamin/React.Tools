import distinct from './distinct';

const duplicate = <T, >(array: T[], distinctDuplicates = true) : T[] => {
  const duplicates = array.filter((item, index) => array.indexOf(item) !== index);
  return distinctDuplicates ? distinct(duplicates) : duplicates;
  // OU [...new Set(duplicates)]
};

export default duplicate;
