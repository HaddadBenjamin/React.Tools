import { useEffect } from 'react';
import useWindowEvent from '../events/useWindowEvent';
import useDebouncedFunction from '../performance/useDebouncedFunction';

// By default, vh and vw units are not correctly supported in mobile.
// To fix it we have to use this hook and this CSS usage calc(var(--vh, 1vh) * 100);
// Usage Exemple : App.Tsx : useViewportsCssVariables()
const useViewportsCssVariables = (): void => {
  const updateViewportsCssVariables = useDebouncedFunction((): void => {
    if (document?.body?.style) {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;

      document?.body?.style.setProperty('--vh', `${vh}px`);
      document?.body?.style.setProperty('--vw', `${vw}px`);
    }
  }, 300);

  useEffect(() => { updateViewportsCssVariables(); }, []);
  useWindowEvent('resize', updateViewportsCssVariables);
};

export default useViewportsCssVariables;
