import { useEffect, useRef, useState } from 'react';

/**
 * Throttle: limite la fréquence de mise à jour d'une valeur même si elle change souvent.
 *
 * Ex :
 * const [value, setValue, throttledValue] = useThrottleState({
 *   initialValue: '',
 *   delay: 500,
 *   onThrottledValueChange: val => fetch(...val)
 * });
 *
 * <input value={value} onChange={e => setValue(e.target.value)} />
 */
type UseThrottleStateParams<T> = {
  initialValue: T;
  delay?: number;
  onThrottledValueChange?: (value: T) => void;
};

function useThrottleState<T>({
  initialValue,
  delay = 600,
  onThrottledValueChange
}: UseThrottleStateParams<T>): [T, (value: T) => void, T] {
  const [value, setValue] = useState<T>(initialValue);
  const [throttledValue, setThrottledValue] = useState<T>(initialValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) return;

    timeoutRef.current = setTimeout(() => {
      setThrottledValue(value);
      onThrottledValueChange?.(value);
      timeoutRef.current = null;
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay, onThrottledValueChange]);

  return [value, setValue, throttledValue];
}

export default useThrottleState;
