const filterWithPrevious = <T>(array: T[], callback: (previous: T | undefined, current: T) => boolean) : T[] => array.filter((element, index) => callback(index > 0 ? array[index - 1] : undefined, element));

export default filterWithPrevious;
