// Ex : http://localhost:3000/a/b/c?queryParam1=1&queryParam2=b#test
// const url = useUrl() // => http://localhost:3000/a/b/c?queryParam1=1&queryParam2=b#test
const useUrl = () : string => window?.location?.href ?? '';

export default useUrl;
