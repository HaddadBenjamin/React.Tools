const contains = <T, >(array: T[], predicate?: (element: T) => boolean) : boolean => (!predicate ? array.length > 0 : !!array.find(predicate));

export default contains;
