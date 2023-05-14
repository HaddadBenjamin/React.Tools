import { useEffect, useState } from 'react';

interface ScreenSize {
  screenWidth: number;
  screenHeight: number;
}

// Optimisation possible : passer en paramètre un throttleValue, valeur par défault = 300, mais créera une dépendance à Lodash.
export default () : ScreenSize => {
  const getScreenSize = (): ScreenSize => ({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState<ScreenSize>({ screenWidth: 0, screenHeight: 0 });

  // useLayoutEffect ? car en SSR on doit attendre que le composant soit monté && que la valeur par défault est 0
  useEffect(() => {
    const onScreenResize = () => setWindowSize(getScreenSize());

    window.addEventListener('resize', onScreenResize);

    onScreenResize();

    return () => window.removeEventListener('resize', onScreenResize);
  }, []);

  return windowSize;
};
