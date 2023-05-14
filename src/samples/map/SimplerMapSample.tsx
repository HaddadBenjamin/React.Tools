import React, { FC, useState } from 'react';
import useSimplerMap from '../../shared/hooks/types/useSimplerMap';
import useMap from '../../shared/hooks/types/useMap';
import usePreviousState from '../../shared/hooks/state/usePreviousState';

const SimplerMapSample: FC = () => {
  const [key, setKey] = useState('1');
  const [value, setValue] = useState(1);

  const [map, {
    set: setMap,
    remove: removeMap,
    clear: clearMap,
  }] = useMap([['1', 1]]);
  const [simplerMap, {
    keys,
    values,
    entries,
    set,
    remove,
    removeByKey,
    removeAllByValue,
    clear,
    get,
    getValueByKey,
    getKeyByValue,
    toMap,
  }] = useSimplerMap([['1', 1]]);
  const previousSimplerMapState = usePreviousState(simplerMap);

  return (
    <div>
      <h2>Use[Map|SimplerMap|PreviousState]</h2>
      {'Key: '}
      <input value={key} onChange={(e) => setKey(e.target.value)} />
      {' Value: '}
      <input value={value.toString()} type='number' onChange={(e) => setValue(parseInt(e.target.value, 10))} />
      <div>{`Use previous state of simpler map: ${previousSimplerMapState}`}</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h3>Simpler map</h3>
          <div>{`Keys: ${keys}`}</div>
          <div>{`Values: ${values}`}</div>
          <div>{`Entries: ${entries}`}</div>
          <div>{`Get: ${get(key)}`}</div>
          <div>{`Get value by key: ${getValueByKey(key)}`}</div>
          <div>{`Get key by value: ${getKeyByValue(value)}`}</div>
          <div>{`To map: ${toMap()}`}</div>
          <div>{`Simpler map: ${simplerMap}`}</div>
          <br />
          <button type='button' onClick={() => set(key, value)}>Set</button>
          <button type='button' onClick={() => remove(key)}>Remove</button>
          <button type='button' onClick={() => removeByKey(key)}>Remove by key</button>
          <button type='button' onClick={() => removeAllByValue(value)}>Remove all by value</button>
          <button type='button' onClick={() => clear()}>Clear</button>
        </div>

        <div>
          <h3>Map</h3>
          <div>{`Keys: ${Array.from(map.keys())}`}</div>
          <div>{`Values: ${Array.from(map.values())}`}</div>
          <div>{`Entries: ${Array.from(map.entries())}`}</div>
          <br />
          <button type='button' onClick={() => setMap(key, value)}>Set</button>
          <button type='button' onClick={() => removeMap(key)}>Remove</button>
          <button type='button' onClick={() => clearMap()}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default SimplerMapSample;
