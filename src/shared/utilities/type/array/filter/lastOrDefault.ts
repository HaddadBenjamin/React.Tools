const lastOrDefault = <T, >(array: T[], defaultValue : T) : T => (array.length === 0 ? defaultValue : array[array.length - 1]);

export default lastOrDefault;
