import { useCallback, useEffect, useState } from 'react';
import {
  SharedStateHelper,
  SharedStateKey,
} from '../../helpers/SharedStateHelper';

const isSSR = () => typeof window === 'undefined';

type Setter<T> = (value: T | ((prev: T) => T)) => void;
type UseSharedStateReturn<T> = readonly [T, Setter<T>];

function useSharedState<T>(
  key: SharedStateKey,
  defaultValue: T,
): UseSharedStateReturn<T> {
  const get = useCallback(() => SharedStateHelper.get<T>(key, defaultValue), [key, defaultValue]);

  const [, forceUpdate] = useState<T>(get);

  const set = useCallback<Setter<T>>(
    (value) => {
      const prev = get();
      const next = typeof value === 'function' ? (value as (v: T) => T)(prev) : value;
      SharedStateHelper.set(key, next);
    },
    [get, key],
  );

  useEffect(() => {
    if (isSSR()) return;

    // eslint-disable-next-line no-underscore-dangle
    const listeners = SharedStateHelper.__internal.listeners.get(key) || new Set();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listeners.add(forceUpdate as any);
    // eslint-disable-next-line no-underscore-dangle
    SharedStateHelper.__internal.listeners.set(key, listeners);

    // eslint-disable-next-line consistent-return
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      listeners.delete(forceUpdate as any);
      // eslint-disable-next-line no-underscore-dangle
      if (listeners.size === 0) SharedStateHelper.__internal.listeners.delete(key);
    };
  }, [key]);

  return [get(), set] as const;
}

export default useSharedState;
