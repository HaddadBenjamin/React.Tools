import { useEffect } from 'react';

const useWindowEvent = (event: string, callback: () => void) : void => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useWindowEvent;
