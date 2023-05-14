import { useEffect } from 'react';
import useCSRAndSSRState from '../prerendering/useCSRAndSSRState';

// Optimisation possible : passer en paramètre un throttleValue, valeur par défault = 300, mais créera une dépendance à Lodash.
export default () : number => {
  const [scrollPosition, setScrollPosition] = useCSRAndSSRState(window.scrollY);

  const handleScroll = () => setScrollPosition(window.scrollY);

  useEffect(() => {
    // Fonctionne en SSR car le composant est monté à ce moment
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};
