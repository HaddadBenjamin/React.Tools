import useUrlHash from './useUrlHash';
import useQueriesParameters from './useQueriesParameters';
import useUrl from './useUrl';
import useRoute from './useRoute';
import useHost from './useHost';

type QueryParameters = { [queryParameter: string]: string }

interface IUseRouteResponse {
    url : string,
    route : string,
    host : string,
    hash?: string
    queryParameters? : QueryParameters
}

// Ex : http://localhost:3000/a/b/c?queryParam1=1&queryParam2=b#test
// const { route, host, hash, queryParameters } = useLocation()
// - url : http://localhost:3000/a/b/c?queryParam1=1&queryParam2=b#test
// - route : a/b/c
// - host : localhost:3000
// - hash : test
// - queryParameters : { queryParam1: '1', queryParam2: 'b' }
const useLocation = () : IUseRouteResponse => {
  const [hash] = useUrlHash();
  const queryParameters = useQueriesParameters();
  const url = useUrl();
  const route = useRoute();
  const host = useHost();

  return ({
    url,
    route,
    host,
    hash,
    queryParameters,
  });
};

export default useLocation;
