const forEachWithPrevious = <T>(array: T[], callback: (previous: T | undefined, current: T) => void) : void => array.forEach((element, index) => callback(index > 0 ? array[index - 1] : undefined, element));

export default forEachWithPrevious;
