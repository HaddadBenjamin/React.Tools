const areDeeplyEquals = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  b: any,
  options?: {
    keysToCheck?: string[];
    keysToIgnore?: string[];
  },
): boolean => {
  if (a === b) return true;

  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;

  const whitelist = options?.keysToCheck;
  const blacklist = options?.keysToIgnore;

  const filterKeys = (keys: string[]) => {
    if (whitelist) return keys.filter((key) => whitelist.includes(key));
    if (blacklist) return keys.filter((key) => !blacklist.includes(key));
    return keys;
  };

  const keysA = filterKeys(Object.keys(a));
  const keysB = filterKeys(Object.keys(b));

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => keysB.includes(key) && areDeeplyEquals(a[key], b[key], options));
};

export default areDeeplyEquals;
