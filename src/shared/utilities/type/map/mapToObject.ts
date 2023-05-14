const mapToObject = <Key, Value>(map : Map<Key, Value>) : { [key: string]: Value } => Object.fromEntries(map);

export default mapToObject;
