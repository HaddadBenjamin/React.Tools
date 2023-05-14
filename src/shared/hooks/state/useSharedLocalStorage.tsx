/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import getLocalStorage from '../../utilities/state/localStorage/getLocalStorage';
import setLocalStorage from '../../utilities/state/localStorage/setLocalStorage';
import removeLocalStorage from '../../utilities/state/localStorage/removeLocalStorage';
import useOnSSR from '../prerendering/useOnSSR';

type UseLocalStorageResponse<T> = [T, (value : T) => void, () => void]

// Équivalent d'un useState pour gérer un état partagé d'une durée de vie infinie tant qu'on clear pas le cache ou qu'on ne vide pas le local storage.
const useSharedLocalStorage = <T, >(key : string, valueIfUndefined : T) : UseLocalStorageResponse<T> => {
  // Assure que vos variables sont différentes à travers vos différents sites, ex: test FR ou, test NC.
  const moreUniqueKey = `${key}_${process.env.NODE_ENV.toUpperCase()}_PUT_YOUR_LOCALE_HERE`;

  const get = () :T => getLocalStorage(moreUniqueKey, valueIfUndefined);
  const set = (value: T) : void => setLocalStorage(moreUniqueKey, value);
  const remove = (): void => removeLocalStorage(moreUniqueKey);

  const [value, setValue] = useState(get());

  useOnSSR({ onSSR: () => setValue(get()) });

  const onStorageChange = (event: StorageEvent) => {
    // Le stringify permet de gérer les types références comme les objets.
    if (event.storageArea === localStorage && event.key === moreUniqueKey && event.newValue !== JSON.stringify(value)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setValue(JSON.parse(event.newValue!) as T);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageChange);

    return () => { window.removeEventListener('storage', onStorageChange); };
  }, []);

  return [value, set, remove];
};

export default useSharedLocalStorage;
