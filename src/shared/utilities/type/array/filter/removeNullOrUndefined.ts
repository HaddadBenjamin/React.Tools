const removeNullOrUndefined = <T>(array : T[]) : T[] => array.filter((element) => element !== null && element !== undefined);

export default removeNullOrUndefined;
