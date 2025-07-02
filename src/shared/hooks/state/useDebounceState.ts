import { useState, useEffect } from 'react';

/**
 Le debounce permet d'appeller une fonction qu'après un délai passé à la fin des actions de l'utilisateur

 Ex :
  // debouncedValue se met moins souvent à jour que value
  const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebounceValue({
     initialValue: 'default value',
     delay: 500,
    onDebouncedValueChange: debouncedSearchTerm => axios.get(path, { searchTerm: debouncedSearchTerm }).then(...)
  })

  <input value={searchTerm} onChange={(e) => setValue(e.target.value)} />;
**/
type UseDebounceStateParameters<T> = {
  initialValue: T;
  delay?: number;
  onDebouncedValueChange?: (value: T) => void;
};

function useDebounceState<T>({
  initialValue,
  delay = 600,
  onDebouncedValueChange,
}: UseDebounceStateParameters<T>): [T, (value: T) => void, T] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value !== debouncedValue) {
        setDebouncedValue(value);
        onDebouncedValueChange?.(value);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay, onDebouncedValueChange, debouncedValue]);

  return [value, setValue, debouncedValue];
}

export default useDebounceState;
