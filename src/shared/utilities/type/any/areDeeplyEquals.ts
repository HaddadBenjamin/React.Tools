const areDeeplyEquals = (a : any, b : any) : boolean => {
  if (a === b) return true;

  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') return a === b;

  const ctor1 = a.constructor;
  if (ctor1 !== b.constructor) return false;

  const keys2 = Object.keys(b);
  if (Object.keys(a).length !== keys2.length) return false;

  const keys1 = Object.keys(a);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (!keys2.includes(key) || !areDeeplyEquals(a[key], b[key])) return false;
  }

  return true;
};

export default areDeeplyEquals;
