const any = <T, >(array: T[], predicate: (element: T) => boolean) : boolean => array.length === array.filter(predicate).length;

export default any;
