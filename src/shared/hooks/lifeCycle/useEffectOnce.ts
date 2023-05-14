import { DependencyList, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSameArrays = (a: any, b: any) : boolean => a.length === b.length && a.every((element: any, index: number) => element === b[index]);

const useEffectOnce = (callback: () => void, dependencies: DependencyList) : void => {
  const hasRunOnce = useRef(false);
  const previousDependencies = useRef(dependencies);

  useEffect(() => {
    if (!isSameArrays(previousDependencies.current, dependencies) && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, dependencies);
};

export default useEffectOnce;
