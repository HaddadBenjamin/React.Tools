const stringToFloat = (text: string) => {
  if (!text) return '';
  const WIDTH_SIZE_MATCHER = /[+-]?\d+(\.\d+)?/g;
  const regexArrayResult = text.match(WIDTH_SIZE_MATCHER);
  if (regexArrayResult) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return `${text.match(WIDTH_SIZE_MATCHER).map((v: string) => parseFloat(v))[0]}%`;
  }
  return null;
};

export default stringToFloat;
