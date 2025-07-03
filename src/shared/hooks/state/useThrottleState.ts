import { useEffect, useRef, useState } from 'react';

/**
 * Throttle limits how often a function can be called over time,
 * even if the value changes frequently.
 *
 * Example:
 * const [searchTerm, setSearchTerm] = useThrottleState({
 *   initialValue: '',
 *   delay: 500,
 *   onThrottle: () => axios.get(path, { searchTerm }).then(...)
 * });
 *
 * <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
 */
type UseThrottleStateParameters<T> = {
  initialValue: T;
  delay?: number;
  onThrottle?: () => void;
};

function useThrottleState<T>({
  initialValue,
  delay = 600,
  onThrottle,
}: UseThrottleStateParameters<T>): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const throttlingRef = useRef(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!throttlingRef.current) {
      throttlingRef.current = true;
      onThrottle?.();

      const timeoutId = setTimeout(() => {
        throttlingRef.current = false;
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [value, delay, onThrottle]);

  return [value, setValue];
}

export default useThrottleState;
