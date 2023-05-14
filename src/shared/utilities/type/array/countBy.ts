const countBy = <T, >(array: T[], predicate: (element: T) => boolean) : number => array.filter(predicate).length;

export default countBy;
