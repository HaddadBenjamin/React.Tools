// [5,1,6]        => [[5, 5], [5, 1], [5, 6], [1, 5], [1, 1], [1, 6], [6, 5], [6, 1], [6, 6]]
// [5,1,6], false, true => [[5, 1], [5, 6], [1, 6]]
// [5,1,6], false, false => [[5, 5], [5, 1], [5, 6], [1, 1], [1, 6], [6, 6]]
import distinctBy from '../filter/distinctBy';

const pair = <T>(array: T[], inclusive = true, removeSameIndexPairs = true) : T[][] => {
  const pairs = array.flatMap((n1, i) => (removeSameIndexPairs ? array.filter((n2, j) => i !== j) : array).map((n2) => [n1, n2]));
  return inclusive ? pairs : distinctBy(pairs, (a, b) => (a[0] === b[1] && a[1] === b[0]));
};

export default pair;
