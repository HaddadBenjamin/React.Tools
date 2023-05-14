import setLocalStorage from './setLocalStorage';

const getLocalStorage = <T>(key : string, valueIfUndefined : T) : T => {
  if (typeof window === 'undefined') return valueIfUndefined;

  try {
    const item = window.localStorage.getItem(key);

    if (item) return JSON.parse(item) as T;

    setLocalStorage(key, valueIfUndefined);
    return valueIfUndefined;
  } catch (error) {
    console.log(error);

    return valueIfUndefined;
  }
};

export default getLocalStorage;
