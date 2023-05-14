import { useEffect, useState } from 'react';

// Créé un état et l'initialise tout de suite si CSR et au montage si SSR
const useCSRAndSSRState = <TState>(value?: TState) : [TState, (newState:TState) => void] => {
  const [state, setState] = useState<TState>();
  // Calcul la valeur qu'avant le montage
  const [isSSR] = useState(typeof window === 'undefined');
  const [haveBeenInitialized, setHaveBeenInitialized] = useState(false);

  const initalize = (ssr: boolean) : void => {
    if (!haveBeenInitialized && ssr === isSSR) {
      if (value) setState(value);
      setHaveBeenInitialized(true);
    }
  };

  initalize(false);
  useEffect(() => { initalize(true); }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return [state!, setState];
};

export default useCSRAndSSRState;
