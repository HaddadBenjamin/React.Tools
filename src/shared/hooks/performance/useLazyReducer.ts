import { useEffect, useState } from 'react';
import { lazyStore } from '../../../samples/lazyRedux/root.store';

interface IUseLazyReducerParameters {
  key: string,
  path: string,
  condition? : boolean,
}

const useLazyReducer = ({ key, path, condition = true } : IUseLazyReducerParameters): boolean => {
  const [reducerIsInjected, setReducerIsInjected] = useState(
    lazyStore.doesReducerHasBeenInjected(key),
  );

  useEffect(
    () => {
      const asyncInjectReducer = async () => {
        if (!reducerIsInjected && condition) {
          const { default: reducer } = await import(`../../${path}`);

          lazyStore.injectReducer(key, reducer);

          setReducerIsInjected(true);
        }
      };

      asyncInjectReducer();
    }, // eslint-disable-next-line
		[condition, reducerIsInjected])

  return reducerIsInjected;
};

export default useLazyReducer;
