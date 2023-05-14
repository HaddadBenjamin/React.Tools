const pluralize = (text : string, count : number) : string => `${text}${count > 1 ? 's' : ''}`;

export default pluralize;
