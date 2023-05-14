import queriesParametersStringToObject from './queriesParametersStringToObject';

// => qs.parse()
// Ex : url?a=abc&b=2
// => { a: 'abc', b :'2' }
const getQueriesParametersObject = () : { [queryParameter:string] : string} => queriesParametersStringToObject(window.location.search);

export default getQueriesParametersObject;
