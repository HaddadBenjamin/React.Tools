import { useState, useEffect, useCallback } from 'react';

import {
  SessionStorageHelper,
  SessionStorageKeys,
  sessionStorageListenerMap,
} from '../../helpers/SessionStorageHelper';

const isSSR = () => typeof window === 'undefined';

type Setter<T> = (value: T | ((val: T) => T)) => void;
type UseSharedSessionStorageReturn<T> = readonly [T, Setter<T>];

function useSharedSessionStorage<T>(
  key: SessionStorageKeys,
  defaultValue: T,
): UseSharedSessionStorageReturn<T> {
  const readValue = useCallback(
    (): T => SessionStorageHelper.get<T>(key, defaultValue),
    [key, defaultValue],
  );

  const [, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback<Setter<T>>(
    (value) => {
      if (isSSR()) return;
      try {
        const oldValue = readValue();
        // eslint-disable-next-line @typescript-eslint/ban-types
        const newValue = typeof value === 'function' ? (value as Function)(oldValue) : value;

        SessionStorageHelper.set(key, newValue);
        setStoredValue(newValue);

        sessionStorageListenerMap
          .get(key)
          ?.forEach((listener) => listener(newValue));
      } catch (error) {
        console.warn(`useSharedSessionStorage: failed to set "${key}"`, error);
      }
    },
    [key, readValue],
  );

  useEffect(() => {
    if (isSSR()) return;

    const listeners = sessionStorageListenerMap.get(key) || new Set();

    listeners.add(setStoredValue);
    sessionStorageListenerMap.set(key, listeners);

    // eslint-disable-next-line consistent-return
    return () => {
      listeners.delete(setStoredValue);
      if (listeners.size === 0) sessionStorageListenerMap.delete(key);
    };
  }, [key]);

  useEffect(() => {
    if (isSSR()) return;

    const onStorage = (event: StorageEvent) => {
      if (event.storageArea === sessionStorage && event.key === key) {
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

  return [SessionStorageHelper.get<T>(key, defaultValue), setValue] as const;
}

export default useSharedSessionStorage;
