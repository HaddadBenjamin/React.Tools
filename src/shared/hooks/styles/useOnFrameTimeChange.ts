import { useEffect, useRef } from 'react';

// Ex : useOnFrameTimeChange(setFrameTime);
const useOnFrameTimeChange = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (deltaTime: number) => {
    if (previousTimeRef.current) callback(deltaTime - previousTimeRef.current);
    previousTimeRef.current = deltaTime;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    // eslint-disable-next-line consistent-return, @typescript-eslint/no-non-null-assertion
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);
};

export default useOnFrameTimeChange;
