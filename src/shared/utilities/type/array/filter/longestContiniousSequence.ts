/* eslint-disable @typescript-eslint/restrict-plus-operands, no-plusplus */
/* Exemple :
* 'abdefffd'.split('') => ['d','e','f']
*  [1,2,4,5,6,6,6,4] => [4,5,6]
* */
const longestContinuousSequence = <T, >(array: T[]) : T [] => {
  let maxLength = 0;
  let currentLength = 1;
  let startIndex = 0;
  let endIndex = 0;
  const { length } = array;
  const idStringArray = length && typeof array[0] === 'string';

  for (let i = 1; i < length; i++) {
    if (idStringArray
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      ? array[i].charCodeAt(0) === array[i - 1].charCodeAt(0) + 1 : array[i] === array[i - 1] + 1) currentLength++;
    else {
      if (currentLength > maxLength) {
        maxLength = currentLength;
        endIndex = i - 1;
        startIndex = i - currentLength;
      }
      currentLength = 1;
    }
  }

  if (currentLength > maxLength) {
    maxLength = currentLength;
    endIndex = length - 1;
    startIndex = length - currentLength;
  }

  return array.slice(startIndex, endIndex + 1);
};

export default longestContinuousSequence;
