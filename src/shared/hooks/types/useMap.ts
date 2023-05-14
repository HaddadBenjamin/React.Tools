import { useState } from 'react';

type UseMapResponse<TKey, TValue> = [
  Map<TKey, TValue>, {
    set: (key: TKey, value: TValue) => Map<TKey, TValue>,
    remove: (key: TKey) => Map<TKey, TValue>,
    clear: () => Map<TKey, TValue>
  }
]

// Créer une map stateful, si vous la modifier, ça rerendra le composant.
// Ex : const [map, { set, remove, clear }] = useMap([['apples', 10]]);
const useMap = <TKey, TValue>(initialValue? : [TKey, TValue][]) : UseMapResponse<TKey, TValue> => {
  const [map, setMap] = useState(new Map(initialValue));

  return [map, ({
    set: (key: TKey, value: TValue) : Map<TKey, TValue> => {
      const nextMap = new Map(map);

      nextMap.set(key, value);
      setMap(nextMap);

      return nextMap;
    },
    remove: (key: TKey) : Map<TKey, TValue> => {
      const nextMap = new Map(map);

      nextMap.delete(key);
      setMap(nextMap);

      return nextMap;
    },
    clear: () : Map<TKey, TValue> => {
      const nextMap = new Map();

      setMap(nextMap);

      return nextMap;
    },
  })];
};

export default useMap;
