import mapToArray from '../../map/mapToArray';

const groupBy = <T, K, V>(
  array: T[],
  getKey: (element: T) => K,
  map?: (item: T) => V,
) : { key : K, value : (T | V)[] }[] => {
  const group = array.reduce((groupedElements, element) => {
    const key = getKey(element);
    const mappedElement = map ? map(element) : element;

    if (!groupedElements.has(key)) groupedElements.set(key, [mappedElement]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    else groupedElements.get(key).push(mappedElement);

    return groupedElements;
    // eslint-disable-next-line comma-spacing
  }, new Map<K,(T | V)[]>());

  return mapToArray(group);
};

export default groupBy;
