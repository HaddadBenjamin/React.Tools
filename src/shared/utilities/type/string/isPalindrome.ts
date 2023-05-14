const isPalindrome = (text: string, start = 0, end = -1) : boolean => {
  // eslint-disable-next-line no-param-reassign
  if (end === -1) end = text.length;
  const isEven = (end - start) + 1;

  // eslint-disable-next-line no-plusplus
  for (let i = start, j = end; isEven ? i <= j : i < j; i++, j--) {
    const left = text[i];
    const right = text[j];

    if (left !== right) return false;
  }

  return true;
};

export default isPalindrome;
