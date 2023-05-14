import { useEffect, useRef } from 'react';

// Ex : const isCheckedPreviousState = usePreviousState(isChecked)
const usePreviousState = <TState>(state: TState) => {
  const previousStateRef = useRef<TState|undefined>();

  useEffect(() => { previousStateRef.current = state; });

  return previousStateRef.current;
};

export default usePreviousState;
