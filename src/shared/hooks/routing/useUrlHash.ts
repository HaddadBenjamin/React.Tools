import { useCallback, useEffect, useState } from 'react';
import useWindowEvent from '../events/useWindowEvent';

// Ex : http://localhost:3000#test
// const [urlHash] = useUrlHash => test
const useUrlHash = () : [string|undefined, (urlHash:string)=> void] => {
  const getHash = () : string => window.location.hash.replace('#', '');

  const [urlHash, setUrlHash] = useState<string|undefined>();

  const onUrlHashChange = useCallback(() => setUrlHash(getHash()), []);

  useEffect(onUrlHashChange, []);
  useWindowEvent('hashChange', onUrlHashChange);

  const updateUrlHash = useCallback(
    (newHash) => {
      if (newHash !== urlHash) window.location.hash = newHash;
    },
    [urlHash],
  );

  return [urlHash, updateUrlHash];
};

export default useUrlHash;
