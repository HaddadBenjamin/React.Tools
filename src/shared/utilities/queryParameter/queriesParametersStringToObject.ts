// Ex : const ?a=abc&b=2 => { a: 'abc', b: '2' }
const queriesParametersStringToObject = (queryParameterString: string) : { [queryParameter:string] : string} => Object.fromEntries(new URLSearchParams(queryParameterString));

export default queriesParametersStringToObject;
