export type MemoizedFunc<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ReturnType<T>;
