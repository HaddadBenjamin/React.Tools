import { useEffect, useState } from 'react';
import useWindowEvent from '../events/useWindowEvent';

type QueryParameters = { [queryParameter: string]: string }

// Ex : http://localhost:3000?queryParam1=1&queryParam2=b#test
// => const queryParameters = useQueryParameters() // => { queryParam1: '1', queryParam2: 'b' }
const useQueriesParameters = () : QueryParameters | undefined => {
  const [queryParameters, setQueryParameters] = useState<QueryParameters>();

  const updateQueriesParameters = () : void => setQueryParameters(Object.fromEntries(new URLSearchParams(window.location.search)));

  useEffect(updateQueriesParameters, []);

  useWindowEvent('popstate', updateQueriesParameters);
  useWindowEvent('pushstate', updateQueriesParameters);
  useWindowEvent('replacestate', updateQueriesParameters);

  return queryParameters;
};

export default useQueriesParameters;
