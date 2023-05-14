const remove = <T, >(array: T[], element: T) : T[] => array.filter((item) => !(item === element));

export default remove;
