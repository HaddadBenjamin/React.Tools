const firstOrDefault = <T, >(array: T[], defaultValue : T) : T => (array.length === 0 ? defaultValue : array[0]);

export default firstOrDefault;
