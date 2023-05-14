// Ex : [1,2,3]     => [3],
//      [1,2,3,4]   => [3,4]
//      [1,2,3], 2  => []
//      [1,2,3], 1  => [3]
//      [1,2,3], 0  => [2,3]
//      [1,2,3], -1 => [1,2,3]
const takeRight = <T, >(array: T[], index = -2) : T[] => array.slice(index === -2 ? array.length / 2 + (array.length % 2 === 1 ? 0.5 : 0) : index + 1, array.length);

export default takeRight;
