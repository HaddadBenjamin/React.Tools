import { useState, useEffect } from 'react';

/**
 * Debounce allows a function to be called only after a delay has passed following the user's last action.
 *
 * Example:
 * const [searchTerm, setSearchTerm] = useDebounceState({
 *   initialValue: 'default value',
 *   delay: 500,
 *   onDebounce: () =>
 *     axios.get(path, { searchTerm }).then(...)
 * });
 *
 * <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
 */
type UseDebounceStateParameters<T> = {
  initialValue: T;
  delay?: number;
  onDebounce?: () => void;
};

function useDebounceState<T>({
  initialValue,
  delay = 600,
  onDebounce: onDebouncedValueChange,
}: UseDebounceStateParameters<T>): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);
  // debouncedValue is updated less frequently than value
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value !== debouncedValue) {
        setDebouncedValue(value);
        onDebouncedValueChange?.();
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay, onDebouncedValueChange, debouncedValue]);

  return [value, setValue];
}

export default useDebounceState;