import { useState } from 'react';
import useDebounceValue from '../performance/useDebounceValue';

// Le debounce permet d'appeller une fonction qu'après un délai passé à la fin des actions de l'utilisateur
// Ex :
//  const [value, setValue, debounceValue] = useDebounceState('default value')
//  <input value={value} onChange={(e) => setValue(e.target.value)} />;
//  console.log(value, debouncedValue) => debouncedValue se met moins souvent à jour que value
const useDebounceState = <T, >(initialValue: T, delayAsMilliseconds = 500) : [T, (value:T) => void, T] => {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounceValue(initialValue, delayAsMilliseconds);

  return [value, setValue, debouncedValue];
};

export default useDebounceState;
