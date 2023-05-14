const removeWhen = <T, >(array: T[], predicate: (element: T) => boolean) : T[] => array.filter((element) => !predicate(element));

export default removeWhen;
