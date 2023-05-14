import { MemoizedFunc } from './memoize.d';

/* Exemple : const memoizedSum = memoize(sum)
*  memoizedSum(1, 2) // 3, ajoute la valeur au cache
*  memoizedSum(1, 2) // 3, récupère la valeur du cache car déjà présente
* */
const memoize = <T extends(...args: any[]) => any>(func: T): MemoizedFunc<T> => {
  const cache = new Map<string, ReturnType<T>>();

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);

    if (cache.has(key)) return cache.get(key)!;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = func.apply(this, args);

    cache.set(key, result);
    return result;
  };
};

export default memoize;
