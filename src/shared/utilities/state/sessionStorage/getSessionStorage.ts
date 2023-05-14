import setSessionStorage from './setSessionStorage';

const getSessionStorage = <T>(key : string, valueIfUndefined : T) : T => {
  if (typeof window === 'undefined') return valueIfUndefined;

  try {
    const item = window.sessionStorage.getItem(key);

    if (item) return JSON.parse(item) as T;

    setSessionStorage(key, valueIfUndefined);
    return valueIfUndefined;
  } catch (error) {
    return valueIfUndefined;
  }
};

export default getSessionStorage;
