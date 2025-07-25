export type SessionStorageKeys = 'any-session-key'; // adapt this to your keys

const isSSR = () => typeof window === 'undefined';

export const sessionStorageListenerMap = new Map<
  string,
  Set<(value: any) => void>
>();

export class SessionStorageHelper {
  static set<T>(key: SessionStorageKeys, value: T): void {
    if (isSSR()) return;

    const newItem = JSON.stringify(value);

    sessionStorage.setItem(key, newItem);
    sessionStorageListenerMap.get(key)?.forEach((listener) => {
      listener(value);
    });
  }

  static get<T>(key: SessionStorageKeys, defaultValue: T): T {
    if (isSSR()) return defaultValue;

    try {
      const raw = sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  static remove(key: SessionStorageKeys): void {
    if (isSSR()) return;
    sessionStorage.removeItem(key);
  }

  static has(key: SessionStorageKeys): boolean {
    if (isSSR()) return false;
    return sessionStorage.getItem(key) !== null;
  }
}
