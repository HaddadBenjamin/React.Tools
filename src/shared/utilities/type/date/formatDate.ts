import moment from 'moment';

const formatDate = (date? : string, separator = ' / ') : string | undefined => {
  const formattedDate = (date ? moment(date).format(`DD${separator}MM${separator}YYYY`) : undefined);

  return formattedDate;
};

export default formatDate;
