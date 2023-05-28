import { useEffect, useState } from 'react';
import { lazyStore } from '../../../../samples/lazyRedux/root.store';

const useLazySaga = (key: string, path: string, condition = true) => {
  const [sagaIsInjected, setSagaIsInjected] = useState(
    lazyStore.doesSagaHasBeenInjected(key),
  );

  useEffect(
    () => {
      const asyncInjectSaga = async () => {
        if (!sagaIsInjected && condition) {
          const { default: saga } = await import(`../../../../../${path}`);

          lazyStore.injectSaga(key, saga);

          setSagaIsInjected(true);
        }
      };

      asyncInjectSaga();
    }, // eslint-disable-next-line
	[condition, sagaIsInjected])

  return sagaIsInjected;
};

export default useLazySaga;
