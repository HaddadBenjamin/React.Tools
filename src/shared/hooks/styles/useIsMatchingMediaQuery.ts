import { useEffect, useState } from 'react';

// Ex : const isMatchingMediaQuery = useIsMatchingMediaQuery('(max-width: 400px)')
const useIsMatchingMediaQuery = (query: string) : boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return false;

  const mediaQuery = window.matchMedia(query);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isMatchingMediaQuery, setIsMatchingMediaQuery] = useState(!!mediaQuery.matches);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handler = () => setIsMatchingMediaQuery(!!mediaQuery.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  return isMatchingMediaQuery;
};

export default useIsMatchingMediaQuery;
