export default (minimum: number, maximum: number): number => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
