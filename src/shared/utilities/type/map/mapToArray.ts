/* eslint-disable no-tabs */
export interface IKeyValue<K, V> {
	key: K,
	value: V
}

const mapToArray = <K, V>(map : Map<K, V>) : IKeyValue<K, V>[] => Array.from(map, ([key, value]) => ({ key, value }));

export default mapToArray;
