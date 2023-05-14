import { DependencyList, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSameArrays = (a: any, b: any) : boolean => a.length === b.length && a.every((element: any, index: number) => element === b[index]);

// EX :
//   const [value, setValue] = useState('please update this value');
//   useOnComponentUpdate(() => console.log(value), [value]);
//   return <input value={value} onChange={(e) => setValue(e.target.value)} />;
const useOnComponentUpdate = (callback: () => void, dependencies: DependencyList) : void => {
  const hasRunOnce = useRef(false);
  const previousDependencies = useRef(dependencies);

  useEffect(() => {
    if (!isSameArrays(previousDependencies.current, dependencies)) {
      if (!hasRunOnce.current) callback();
      else hasRunOnce.current = true;
    }
  }, dependencies);
};

export default useOnComponentUpdate;
