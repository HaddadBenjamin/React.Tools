const removeSessionStorage = (key : string) : void => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(key);

    window.dispatchEvent(new StorageEvent('storage', {
      key,
      newValue: undefined,
      storageArea: sessionStorage,
    }));
  }
};

export default removeSessionStorage;
