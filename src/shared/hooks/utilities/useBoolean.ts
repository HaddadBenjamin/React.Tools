import { useCallback, useState } from 'react';

type UseBooleanResult = {
  value: boolean;
  inverse: () => void;
  enable: () => void;
  disable: () => void;
};

const useBoolean = (initialValue = false): UseBooleanResult => {
  const [value, setValue] = useState(initialValue);

  const inverse = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  const enable = useCallback(() => {
    setValue(true);
  }, []);
  const disable = useCallback(() => {
    setValue(false);
  }, []);

  return {
    value, inverse, enable, disable,
  };
};

export default useBoolean;
