// eslint-disable-next-line no-nested-ternary
const clamp = (number : number, mininium : number, maximum : number) : number => (number < mininium ? mininium : number > maximum ? maximum : number);

export default clamp;
