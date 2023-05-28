import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import selectAbTestsState from '../abTest.selector';
import { abTestReducerKey, abTestSagaKey } from '../abTest.configuration';
import useLazyReducer from '../../redux/lazyRedux/hooks/useLazyReducer';
import useLazySaga from '../../redux/lazyRedux/hooks/useLazySaga';
import { getAbTestsAction } from '../abTest.action';
import { AbTest } from '../abTest.model';

export default (...abTestsIds: number[]): boolean[] => {
  const abTestsState = useSelector(selectAbTestsState);
  const dispatch = useDispatch();

  const reducerIsInjected = useLazyReducer(
    abTestReducerKey,
    'shared/domains/abTest/abTest.reducer',
  );
  const sagaIsInjected = useLazySaga(
    abTestSagaKey,
    'shared/domains/abTest/abTest.saga',
  );

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (
      reducerIsInjected
      && sagaIsInjected
      && !abTestsState.initialized
      && !isInitialized
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
