import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import selectAbTestsState from '../../../domains/abTest/abTest.selector';
import useLazyReducer from '../performance/useLazyReducer';
import {
  abTestReducerKey,
  abTestSagaKey,
} from '../../../domains/abTest/abTest.configuration';
import useLazySaga from '../performance/useLazySaga';
import { getAbTestsAction } from '../../../domains/abTest/abTest.action';
import { AbTest } from '../../../domains/abTest/abTest.model';

export default (...abTestsIds: number[]): boolean[] => {
  const abTestsState = useSelector(selectAbTestsState);
  const dispatch = useDispatch();

  const reducerIsInjected = useLazyReducer({
    key: abTestReducerKey,
    path: 'shared/domains/abTest/abTest.reducer',
  });
  const sagaIsInjected = useLazySaga({
    key: abTestSagaKey,
    path: 'shared/domains/abTest/abTest.saga',
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (
      reducerIsInjected && sagaIsInjected && !abTestsState.initialized && !isInitialized
    ) {
      dispatch(getAbTestsAction());
      setIsInitialized(true);
    }
  }, [
    reducerIsInjected,
    sagaIsInjected,
    abTestsState.initialized,
    isInitialized,
    dispatch,
  ]);

  const getAbTestById = (atId: number): AbTest | undefined => abTestsState.abTests.find((at) => at.id === atId);

  return abTestsIds
    .filter(getAbTestById)
    .map((atId) => getAbTestById(atId)?.enable as boolean);
};
