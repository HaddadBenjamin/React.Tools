import { useEffect, useState } from 'react';
import { lazyStore } from '../../../../samples/lazyRedux/root.store';

const useLazyReducer = (
  key: string,
  path: string,
  condition = true,
) => {
  const [reducerIsInjected, setReducerIsInjected] = useState(
    lazyStore.doesReducerHasBeenInjected(key),
  );

  useEffect(
    () => {
      const asyncInjectReducer = async () => {
        if (!reducerIsInjected && reducerIsInjected) {
          const { default: reducer } = await import(`../../../../../${path}`);

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
