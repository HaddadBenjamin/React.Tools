import take from './take';

const takeWhen = <T, >(array: T[], predicate: (element: T) => boolean) : T[] => take(array, array.findIndex((element) => !predicate(element)));

export default takeWhen;
