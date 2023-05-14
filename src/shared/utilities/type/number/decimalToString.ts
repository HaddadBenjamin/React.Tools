export interface IDecimalToStringParameters {
  decimal: number,
  decimalCount?: number,
  decimalSeparator?: string,
  withThousandSeparator?: boolean
}
const decimalToString = (
  {
    decimal,
    decimalCount = 2,
    decimalSeparator = ',',
    withThousandSeparator,
  } : IDecimalToStringParameters) : string => {
  const formattedDecimal = decimal.toFixed(decimalCount).replace('.', decimalSeparator);

  return withThousandSeparator ? formattedDecimal.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : formattedDecimal;
};

export default decimalToString;
