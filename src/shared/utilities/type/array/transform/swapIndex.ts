import swap from './swap';

const swapIndex = <T, >(array : readonly T[], sourceIndex : number, destinationIndex : number) : readonly T[] => swap(array, array[sourceIndex], array[destinationIndex]);

export default swapIndex;
