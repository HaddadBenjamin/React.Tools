const split = <T, >(array: T[], chunkLenght : number) : T[][] => array.reduce((all, one, i) => {
  const chunkSize = Math.floor(i / chunkLenght);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  all[chunkSize] = [].concat((all[chunkSize] || []), one);
  return all;
}, []);

export default split;
