import { useEffect, useState } from 'react';
import { lazyStore } from '../../../samples/lazyRedux/root.store';

interface IUseLazySagaParameters {
  key: string,
  path: string,
  condition? : boolean,
}

const useLazySaga = ({ key, path, condition = true } : IUseLazySagaParameters): boolean => {
  const [sagaIsInjected, setSagaIsInjected] = useState(
    lazyStore.doesSagaHasBeenInjected(key),
  );

  useEffect(
    () => {
      const asyncInjectSaga = async () => {
        if (!sagaIsInjected && condition) {
          const { default: saga } = await import(`../../${path}`);

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
