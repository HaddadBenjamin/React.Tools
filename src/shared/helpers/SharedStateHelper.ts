export type SharedStateKey = 'any.key';

type Listener = (value: unknown) => void;

const sharedStateStore = new Map<SharedStateKey, unknown>();
const sharedStateListeners = new Map<SharedStateKey, Set<Listener>>();

export const SharedStateHelper = {
  get<T>(key: SharedStateKey, defaultValue: T): T {
    return sharedStateStore.has(key)
      ? (sharedStateStore.get(key) as T)
      : defaultValue;
  },

  set<T>(key: SharedStateKey, value: T): void {
    sharedStateStore.set(key, value);
    sharedStateListeners.get(key)?.forEach((listener) => listener(value));
  },

  update<T>(key: SharedStateKey, updater: (prev: T) => T, fallback: T): void {
    const prev = SharedStateHelper.get(key, fallback);
    const next = updater(prev);
    SharedStateHelper.set(key, next);
  },

  reset(key: SharedStateKey): void {
    sharedStateStore.delete(key);
    sharedStateListeners.get(key)?.forEach((listener) => listener(undefined));
  },

  __internal: {
    store: sharedStateStore,
    listeners: sharedStateListeners
  }
};
