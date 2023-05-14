const skipAndTake = <T, >(array: T[], skipCount: number, takeCount: number) : T[] => array.slice(skipCount, skipCount + takeCount);

export default skipAndTake;
