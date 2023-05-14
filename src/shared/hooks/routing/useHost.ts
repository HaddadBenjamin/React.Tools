// Ex : http://localhost:3000/a/b/c?queryParam1=1&queryParam2=b#test
// const host = useHost() // => localhost:3000
const useHost = () : string => window?.location?.host ?? '';

export default useHost;
