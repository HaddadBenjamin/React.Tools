const mapWithPrevious = <T, Y>(array: T[], callback: (previous: T | undefined, current: T) => Y) : Y[] => array.map((element, index) => callback(index > 0 ? array[index - 1] : undefined, element));

export default mapWithPrevious;
