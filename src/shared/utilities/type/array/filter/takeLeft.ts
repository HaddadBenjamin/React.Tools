// Ex : [1,2,3]    => [1]
//      [1,2,3,4]  => [1,2]
//      [1,2,3], 0 => []
//      [1,2,3], 1 => [1]
//      [1,2,3], 3 => [1,2, 3]
const takeLeft = <T, >(array: T[], index = -1) : T[] => array.slice(0, index === 0 ? 0 : array.length / 2 + (index > 0 ? index - array.length / 2 : 0));

export default takeLeft;
