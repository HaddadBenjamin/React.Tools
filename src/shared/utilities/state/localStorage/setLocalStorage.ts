import { localStorageListenerMap } from '../../../helpers/LocalStorageHelper';

const isSSR = () => typeof window === 'undefined';
const setLocalStorage = <T>(key: string, data: T) => {
  if (!isSSR()) {
    const newValue = JSON.stringify(data);

    window.localStorage.setItem(key, newValue);
    localStorageListenerMap.get(key)?.forEach((listener) => {
      listener(newValue);
    });
    window.dispatchEvent(
      new StorageEvent('storage', {
        key,
        newValue,
        storageArea: localStorage,
      }),
    );
  }
};

export default setLocalStorage;
