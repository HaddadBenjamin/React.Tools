import skip from './skip';

const skipWhen = <T, >(array: T[], predicate: (element: T) => boolean) : T[] => skip(array, array.findIndex((element) => !predicate(element)));

export default skipWhen;
