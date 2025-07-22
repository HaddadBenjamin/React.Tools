// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepCopy = <T = any>(
  obj: T,
  options?: {
    keysToCheck?: string[];
    keysToIgnore?: string[];
  },
): T => {
  if (obj === null || typeof obj !== 'object') return obj;

  const whitelist = options?.keysToCheck;
  const blacklist = options?.keysToIgnore;

  const filterKeys = (keys: string[]) => {
    if (whitelist) return keys.filter((key) => whitelist.includes(key));
    if (blacklist) return keys.filter((key) => !blacklist.includes(key));
    return keys;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = Array.isArray(obj) ? [] : {};
  const keys = filterKeys(Object.keys(obj));

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (obj as any)[key];

    result[key] = typeof value === 'object' && value !== null ? deepCopy(value, options) : value;
  }

  return result;
};

export default deepCopy;
