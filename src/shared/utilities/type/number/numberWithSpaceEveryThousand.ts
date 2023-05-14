const numberWithSpaceEveryThousand = (number : number, separator = ' ') : string => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export default numberWithSpaceEveryThousand;
