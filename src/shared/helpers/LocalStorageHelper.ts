export type LocalStorageKeys = 'any key'; //

const isSSR = () => typeof window === 'undefined';

export const localStorageListenerMap = new Map<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Set<(value: any) => void>
>();

export class LocalStorageHelper {
  static set<T>(key: LocalStorageKeys, value: T): void {
    if (isSSR()) return;

    const newItem = JSON.stringify(value);

    localStorage.setItem(key, newItem);
    localStorageListenerMap.get(key)?.forEach((listener) => {
      listener(newItem);
    });
  }

  static get<T>(key: LocalStorageKeys, defaultValue: T): T {
    if (isSSR()) return defaultValue;

    try {
      const raw = localStorage.getItem(key);

      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  static remove(key: LocalStorageKeys): void {
    if (isSSR()) return;

    localStorage.removeItem(key);
  }

  static has(key: LocalStorageKeys): boolean {
    if (isSSR()) return false;

    return localStorage.getItem(key) !== null;
  }
}
