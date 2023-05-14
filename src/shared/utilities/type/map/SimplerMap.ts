/* eslint-disable no-underscore-dangle */
export default class SimplerMap<TKey, TValue> {
  _map: readonly [TKey, TValue][];

  constructor(map?: readonly [TKey, TValue][]) {
    this._map = map ?? [];
  }

  get keys() : TKey[] { return this._map.map(([key]) => key); }

  get values() : TValue[] { return this._map.map(([, value]) => value); }

  get entries() : readonly [TKey, TValue][] { return this._map; }

  set(key: TKey, value: TValue) : readonly [TKey, TValue][] {
    this._map = this._map.find(([k]) => k === key)
      ? this._map.map(([k, v]) => (k === key ? [key, value] : [k, v]))
      : [...this._map, [key, value]];

    return this._map;
  }

  get(key: TKey) : TValue | undefined { return this._map.find(([k]) => key === k)?.[1]; }

  getKeyByValue(value: TValue) : TKey | undefined { return this._map.find(([, v]) => value === v)?.[0]; }

  getValueByKey(key: TKey) : TValue | undefined { return this.get(key); }

  remove(key: TKey) : readonly [TKey, TValue][] {
    this._map = this._map.filter(([k]) => k !== key);
    return this._map;
  }

  removeByKey(key: TKey) : readonly [TKey, TValue][] { return this.remove(key); }

  removeAllByValue(value: TValue) : readonly [TKey, TValue][] {
    this._map = this._map.filter(([, v]) => v !== value);
    return this._map;
  }

  clear(): readonly [TKey, TValue][] {
    this._map = [];
    return this._map;
  }

  toMap() : Map<TKey, TValue> { return new Map(this._map); }
}
