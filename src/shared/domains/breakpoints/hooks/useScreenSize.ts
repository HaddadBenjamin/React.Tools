import { useEffect, useState } from 'react';

interface ScreenSize {
  width: number;
  height: number;
}

export default (): ScreenSize => {
  const getScreenSize = (): ScreenSize => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState<ScreenSize>(getScreenSize());

  useEffect(() => {
    const onScreenResize = () => setWindowSize(getScreenSize());

    window.addEventListener('resize', onScreenResize);

    onScreenResize();

    return () => window.removeEventListener('resize', onScreenResize);
  }, []);

  return windowSize;
};
