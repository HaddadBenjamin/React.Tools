import { useState } from 'react';
import useWindowEvent from './useWindowEvent';

const computeIsOnline = () => (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
  ? navigator.onLine
  : true);

// Permet de savoir si l'utilisateur est connnecté ou pas à internet
const useIsOnline = () : boolean => {
  const [isOnline, setIsOnline] = useState(computeIsOnline());

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useWindowEvent('online', setOnline);
  useWindowEvent('offline', setOffline);

  return isOnline;
};

export default useIsOnline;
