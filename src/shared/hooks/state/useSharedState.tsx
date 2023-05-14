import { useEffect, useState } from 'react';
import useOnSSR from '../prerendering/useOnSSR';

type UseSharedStateResponse<T> = [T, (value : T) => void, () => void]

export class SharedState {
  // eslint-disable-next-line semi
  public static Cache = new Map<string, string>([])
}

export const getShareState = <T, >(key : string, valueIfUndefined : T) : T => {
  const value = SharedState.Cache.get(key);

  if (value) return JSON.parse(value) as T;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (valueIfUndefined) { SharedState.Cache[key] = valueIfUndefined; }

  return valueIfUndefined;
};

export const setShareState = <T, >(key : string, data : T) : void => {
  const newValue = JSON.stringify(data);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  SharedState.Cache[key] = newValue;
  window.dispatchEvent(new StorageEvent('storage', { key, newValue, storageArea: null }));
};

export const removeShareState = (key: string) : void => {
  SharedState.Cache.delete(key);
  window.dispatchEvent(new StorageEvent('storage', { key, newValue: undefined, storageArea: null }));
};

// Équivalent d'un useState pour gérer un état partagé d'une durée d'une tabulation, comme Redux.
const useSharedState = <T, >(key : string, valueIfUndefined : T) : UseSharedStateResponse<T> => {
  const get = () : T => getShareState(key, valueIfUndefined);
  const set = (value: T) : void => setShareState(key, value);
  const remove = (): void => removeShareState(key);

  const [value, setValue] = useState(get());

  useOnSSR({ onSSR: () => setValue(get()) });

  const onStorageChange = (event: StorageEvent) => {
    // Le stringify permet de gérer les types références comme les objets.
    if (event.storageArea === null && event.key === key && event.newValue !== JSON.stringify(value)) {
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

export default useSharedState;
