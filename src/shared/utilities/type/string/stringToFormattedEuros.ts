import stringToNumber from './stringToNumber';
import numberWithSpaceEveryThousand from '../number/numberWithSpaceEveryThousand';

const stringToFormattedEuros = (text? : string) : string => {
  const textAsNumber = stringToNumber(text, 0) as number;

  return textAsNumber > 1000 || textAsNumber < -1000 ? `${numberWithSpaceEveryThousand(Math.round(textAsNumber / 1000))} K€` : `${textAsNumber} €`;
};

export default stringToFormattedEuros;
