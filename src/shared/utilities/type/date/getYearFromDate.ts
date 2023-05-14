import moment from 'moment';
import stringToNumber from '../string/stringToNumber';

const getYearFromDate = (date : string) => stringToNumber(moment(date).format('YYYY'));

export default getYearFromDate;
