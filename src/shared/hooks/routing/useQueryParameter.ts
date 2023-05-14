import { useCallback, useEffect, useState } from 'react';
import useWindowEvent from '../events/useWindowEvent';

// Ex : http://localhost:3000?queryParam1=abc
// const queryParameter = userQueryParameter('queryParam1') // => abc
const useQueryParameter = (queryParameterName: string) => {
  const getValue = useCallback(
    () : string | null => new URLSearchParams(window.location.search).get(queryParameterName),
    [queryParameterName],
  );

  const [queryParameterValue, setQueryParameterValue] = useState<string|undefined|null>();

  const onQueryParameterChange = () => setQueryParameterValue(getValue());

  useEffect(onQueryParameterChange, []);

  useWindowEvent('popstate', onQueryParameterChange);
  useWindowEvent('pushstate', onQueryParameterChange);
  useWindowEvent('replacestate', onQueryParameterChange);

  return queryParameterValue;
};

export default useQueryParameter;
