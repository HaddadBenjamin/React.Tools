import { useEffect, useState } from 'react';
import getSessionStorage from '../../utilities/state/sessionStorage/getSessionStorage';
import setSessionStorage from '../../utilities/state/sessionStorage/setSessionStorage';
import removeSessionStorage from '../../utilities/state/sessionStorage/removeSessionStorage';
import useOnSSR from '../prerendering/useOnSSR';

type UseSessionStorageResponse<T> = [T, (value : T) => void, () => void]

// Équivalent d'un useState pour gérer un état partagé d'une durée de vie d'une session, c'est à dire, tant qu'on ne ferme pas le navigateur.
const useSharedSessionStorage = <T, >(key : string, valueIfUndefined : T) : UseSessionStorageResponse<T> => {
// Assure que vos variables sont différentes à travers vos différents sites, ex: test FR ou, test NC.
  const moreUniqueKey = `${key}_${process.env.NODE_ENV.toUpperCase()}_PUT_YOUR_LOCALE_HERE`;

  const get = () :T => getSessionStorage(moreUniqueKey, valueIfUndefined);
  const set = (value: T) : void => setSessionStorage(moreUniqueKey, value);
  const remove = (): void => removeSessionStorage(moreUniqueKey);

  const [value, setValue] = useState(get());

  useOnSSR({ onSSR: () => setValue(get()) });

  const onStorageChange = (event: StorageEvent) => {
    // Le stringify permet de gérer les types références comme les objets.
    if (event.storageArea === sessionStorage && event.key === moreUniqueKey && event.newValue !== JSON.stringify(value)) {
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

export default useSharedSessionStorage;
