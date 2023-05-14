const containsAll = <T, >(array : readonly T[], otherArray : readonly T[]) : boolean => otherArray.every((v) => array.includes(v));

export default containsAll;
