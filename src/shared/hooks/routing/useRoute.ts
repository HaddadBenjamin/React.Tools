// Ex : http://localhost:3000/a/b/c?queryParam1=1&queryParam2=b#test
// const route = useRoute() // =>  a/b/c
const useRoute = () : string => window?.location?.pathname?.replace('/', '') ?? '';

export default useRoute;
