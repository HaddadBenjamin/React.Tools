// Exemple : 'Salut, les. gens!, ça va?' => 'Salut les gens a va'
const removePunctuation = (text: string): string => text
// eslint-disable-next-line no-useless-escape
  .replace(/[^\w\s\']|_/g, '')
  .replace(/\s+/g, ' ');

export default removePunctuation;
