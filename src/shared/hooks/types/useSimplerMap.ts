import { useState } from 'react';
import SimplerMap from '../../utilities/type/map/SimplerMap';

type UseSimplerMapResponse<TKey, TValue> = [[TKey, TValue][],
  {
    keys: TKey[],
    values: TValue[],
    entries: readonly [TKey, TValue][]

    // Met à jour l'état React
    set: (key: TKey, value: TValue) => readonly [TKey, TValue][]

    // Met à jour l'état React
    remove: (key: TKey) => readonly [TKey, TValue][],
    removeByKey: (key: TKey) => readonly [TKey, TValue][],
    removeAllByValue: (value: TValue) => readonly [TKey, TValue][],

    // Met à jour l'état React
    clear: () => readonly [TKey, TValue][],

    get: (key: TKey) => TValue | undefined,
    getKeyByValue: (value: TValue) => TKey | undefined,
    getValueByKey: (key: TKey) => TValue | undefined,

    toMap: () => Map<TKey, TValue>
  }
]

// Créer une map stateful, si vous la modifier, ça rerendra le composant.
// Ex : const [map, { set, remove, clear }] = useMap([['apples', 10]]);
const useSimplerMap = <TKey, TValue>(initialValue?: [TKey, TValue][]) : UseSimplerMapResponse<TKey, TValue> => {
  const [simplerMap, setSimplerMap] = useState(new SimplerMap(initialValue));

  const set = (key: TKey, value: TValue) : readonly [TKey, TValue][] => {
    const newSimplerMap = simplerMap.set(key, value);

    setSimplerMap(new SimplerMap([...newSimplerMap]));

    return newSimplerMap;
  };

  const remove = (key: TKey) : readonly [TKey, TValue][] => {
    const newSimplerMap = simplerMap.remove(key);

    setSimplerMap(new SimplerMap([...newSimplerMap]));

    return newSimplerMap;
  };

  const removeByKey = (key: TKey) : readonly [TKey, TValue][] => {
    const newSimplerMap = simplerMap.removeByKey(key);

    setSimplerMap(new SimplerMap([...newSimplerMap]));

    return newSimplerMap;
  };

  const removeAllByValue = (value: TValue) : readonly [TKey, TValue][] => {
    const newSimplerMap = simplerMap.removeAllByValue(value);

    setSimplerMap(new SimplerMap([...newSimplerMap]));

    return newSimplerMap;
  };
  const entries = [...simplerMap.entries];
  return [entries, {
    keys: simplerMap.keys,
    values: simplerMap.values,
    entries: simplerMap.entries,
    set,
    remove,
    removeByKey,
    removeAllByValue,
    clear: () : readonly [TKey, TValue][] => {
      const newSimplerMap = simplerMap.clear();

      setSimplerMap(new SimplerMap(newSimplerMap));

      return newSimplerMap;
    },

    get: (key: TKey) : TValue | undefined => simplerMap.get(key),
    getKeyByValue: (value: TValue) : TKey | undefined => simplerMap.getKeyByValue(value),
    getValueByKey: (key: TKey) : TValue | undefined => simplerMap.getValueByKey(key),

    toMap: () : Map<TKey, TValue> => simplerMap.toMap(),
  }];
};

export default useSimplerMap;
