const toTitleCase = (text : string) : string => text.replace(
  /\w\S*/g,
  (txt : string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
);

export default toTitleCase;
