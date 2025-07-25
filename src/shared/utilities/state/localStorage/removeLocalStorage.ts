const isSSR = () => typeof window === 'undefined';
const removeLocalStorage = (key: string): void => {
  if (!isSSR()) {
    window.localStorage.removeItem(key);

    window.dispatchEvent(
      new StorageEvent('storage', {
        key,
        newValue: undefined,
        storageArea: localStorage
      })
    );
  }
};

export default removeLocalStorage;
