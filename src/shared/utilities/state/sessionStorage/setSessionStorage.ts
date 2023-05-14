const setSessionStorage = <T>(key : string, data : T) => {
  if (typeof window !== 'undefined') {
    const newValue = JSON.stringify(data);

    window.sessionStorage.setItem(key, newValue);
    window.dispatchEvent(new StorageEvent('storage', {
      key,
      newValue,
      storageArea: sessionStorage,
    }));
  }
};

export default setSessionStorage;
