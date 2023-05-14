import { useEffect, useRef } from 'react';

// Le throttle permet d'appeller une fonction qu'une fois tous les n temps
const useThrottledFunction = (callback: () => void, delay = 350): (() => void) => {
  // eslint-disable-next-line no-undef
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const throttledFunction = useRef<() => void>(() => {
    if (!timeoutRef.current) {
      savedCallback.current();
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, delay);
    }
  });

  useEffect(() => () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return throttledFunction.current;
};

export default useThrottledFunction;
