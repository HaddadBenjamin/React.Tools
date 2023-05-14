import { useEffect, useState } from 'react';

// Créé un état qui fonctionne à la fois en CSR que SSR
// L'état est initialisé tout de suite en CSR et au montage si SSR.
const useIsomorphicState = <TState>(value?: TState) : [TState, (newState:TState) => void] => {
  const [isSSR] = useState(typeof window === 'undefined');

  const [state, setState] = useState(value);

  useEffect(() => {
    if (isSSR) setState(value);
  }, []);

  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  return [state!, setState];
};

export default useIsomorphicState;
