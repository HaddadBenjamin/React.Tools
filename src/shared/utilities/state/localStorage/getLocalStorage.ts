import setLocalStorage from './setLocalStorage';

const isSSR = () => typeof window === 'undefined';
const getLocalStorage = <T>(key : string, valueIfUndefined : T) : T => {
  if (!isSSR()) return valueIfUndefined;

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
