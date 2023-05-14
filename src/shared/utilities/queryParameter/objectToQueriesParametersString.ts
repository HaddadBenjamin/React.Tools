// objectToQueriesParametersString({ a: 'abc', b: 2 }) // => ?a=abc&b=2
// objectToQueriesParametersString() // => ''
// => qs.stringify()
const objectToQueriesParametersString = (queriesParametersObject : { [queryParameter:string]: string }) : string => {
  const queryParameterString = new URLSearchParams(queriesParametersObject).toString();

  return queryParameterString ? `?${queryParameterString}` : queryParameterString;
};

export default objectToQueriesParametersString;
