const create2DArray = <T, >(
  array: T[],
  m: number,
  n: number,
  defaultValue: T) : T[][] => Array.from({ length: m }, () => Array.from({ length: n }, () => defaultValue));

export default create2DArray;
