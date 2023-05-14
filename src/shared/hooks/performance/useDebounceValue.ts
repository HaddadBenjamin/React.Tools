import { useEffect, useState } from 'react';

// Le debounce permet d'appeller une fonction qu'après un délai passé à la fin des actions de l'utilisateur
// useDebounceState simplifie => const [value, setValue, debounceValue] = useDebounceValue('default value')
// Ex :
//  const [value, setValue] = useState('default value')
//  const debouncedValue = useDebounceValue(value) => debouncedValue se met moins souvent à jour que value
//  <input value={value} onChange={(e) => setValue(e.target.value)} />;
//  console.log(value, debouncedValue) => debouncedValue se met moins souvent à jour que value
const useDebounceValue = <T, >(value: T, delayAsMilliseconds = 500) : T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => setDebouncedValue(value), delayAsMilliseconds);
    return () => clearTimeout(setTimeoutId);
  }, [value, delayAsMilliseconds]);

  return debouncedValue;
};

export default useDebounceValue;
