const containsNullOrUndefined = <T>(array : T[]) : boolean =>
  array.some((element) => element === null || element === undefined);

export default containsNullOrUndefined;
