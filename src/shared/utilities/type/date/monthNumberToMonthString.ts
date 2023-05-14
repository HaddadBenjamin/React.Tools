const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const monthNumberToMonthString = (monthNumber : number) : string => months[monthNumber - 1];

export default monthNumberToMonthString;
