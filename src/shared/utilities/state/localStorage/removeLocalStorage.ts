const removeLocalStorage = (key : string) : void => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);

    window.dispatchEvent(new StorageEvent('storage', {
      key,
      newValue: undefined,
      storageArea: localStorage,
    }));
  }
};

export default removeLocalStorage;
