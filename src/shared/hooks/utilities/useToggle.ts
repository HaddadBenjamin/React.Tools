import { useState } from 'react';

const useToggle = (initialValue = true) : readonly [
  boolean, // isToggled
  () => void, // toggle
  (toggled : boolean) => void // setIsToggled
] => {
  const [value, setValue] = useState(initialValue);
  const toggle = (): void => setValue(!value);

  return [value, toggle, setValue] as const;
};

export default useToggle;
