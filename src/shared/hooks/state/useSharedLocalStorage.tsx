import { useState, useEffect, useCallback } from 'react';

import {
  LocalStorageHelper,
  LocalStorageKeys,
  localStorageListenerMap,
} from '../../helpers/LocalStorageHelper';

const isSSR = () => typeof window === 'undefined';

type Setter<T> = (value: T | ((val: T) => T)) => void;
type UseSharedLocalStorageReturn<T> = readonly [T, Setter<T>];

function useSharedLocalStorage<T>(
  key: LocalStorageKeys,
  defaultValue: T,
): UseSharedLocalStorageReturn<T> {
  const readValue = useCallback((): T => LocalStorageHelper.get<T>(key, defaultValue), [key, defaultValue]);

  const [, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback<Setter<T>>(
    (value) => {
      if (isSSR()) return;
      try {
        const oldValue = readValue();
        // eslint-disable-next-line @typescript-eslint/ban-types
        const newValue = typeof value === 'function' ? (value as Function)(oldValue) : value;

        LocalStorageHelper.set(key, newValue);
        setStoredValue(newValue);

        localStorageListenerMap
          .get(key)
          ?.forEach((listener) => listener(newValue));
      } catch (error) {
        console.warn(`useSharedLocalStorage: failed to set "${key}"`, error);
      }
    },
    [key, readValue],
  );

  useEffect(() => {
    if (isSSR()) return;

    const listeners = localStorageListenerMap.get(key) || new Set();

    listeners.add(setStoredValue);
    localStorageListenerMap.set(key, listeners);

    // eslint-disable-next-line consistent-return
    return () => {
      listeners.delete(setStoredValue);

      if (listeners.size === 0) localStorageListenerMap.delete(key);
    };
  }, [key]);

  useEffect(() => {
    if (isSSR()) return;

    const onStorage = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = event.newValue
          ? JSON.parse(event.newValue)
          : defaultValue;

        setStoredValue(newValue);
      }
    };

    window.addEventListener('storage', onStorage);

    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('storage', onStorage);
  }, [key, defaultValue]);

  return [LocalStorageHelper.get<T>(key, defaultValue), setValue] as const;
}

export default useSharedLocalStorage;
