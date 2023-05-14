const setLocalStorage = <T>(key : string, data : T) => {
  if (typeof window !== 'undefined') {
    const newValue = JSON.stringify(data);

    window.localStorage.setItem(key, newValue);
    window.dispatchEvent(new StorageEvent('storage', {
      key,
      newValue,
      storageArea: localStorage,
    }));
  }
};

export default setLocalStorage;
