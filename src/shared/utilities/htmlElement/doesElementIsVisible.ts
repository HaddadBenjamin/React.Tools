// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (element: any) : boolean => {
  if (!element) return false;

  const {
    top, left, bottom, right,
  } = element.getBoundingClientRect();

  return (
    top >= 0
    && left >= 0
    && bottom
      <= (window.innerHeight || document.documentElement.clientHeight)
    && right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
