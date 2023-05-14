const femalize = (text : string, isFemale : boolean) : string => `${text}${isFemale ? 'e' : ''}`;

export default femalize;
