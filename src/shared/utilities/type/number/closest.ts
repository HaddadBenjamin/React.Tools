const closest = (array: number[], target: number) : number => array.sort((a, b) => Math.abs(target - a) - Math.abs(target - b))[0];

export default closest;
