import { useEffect, useState } from 'react';

interface IUseSSRParameters { onSSR?: () => void }

const useOnSSR = (parameters? : IUseSSRParameters) : boolean => {
  // Calcul la valeur qu'avant le montage
  const [isSSR] = useState(typeof window === 'undefined');

  useEffect(() => {
    if (isSSR) parameters?.onSSR?.();
  }, []);

  return isSSR;
};

export default useOnSSR;
