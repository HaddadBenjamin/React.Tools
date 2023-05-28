import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import selectFeatureFlagsState from '../../../domains/featureFlag/featureFlag.selector';
import useLazyReducer from '../performance/useLazyReducer';
import {
  featureFlagReducerKey,
  featureFlagSagaKey,
} from '../../../domains/featureFlag/featureFlag.configuration';
import useLazySaga from '../performance/useLazySaga';
import { getFeatureFlagsAction } from '../../../domains/featureFlag/featureFlag.action';
import { FeatureFlag } from '../../../domains/featureFlag/featureFlag.model';

export default (...featureFlagsIds: number[]): boolean[] => {
  const featureFlagsState = useSelector(selectFeatureFlagsState);
  const dispatch = useDispatch();

  const reducerIsInjected = useLazyReducer({
    key: featureFlagReducerKey,
    path: 'shared/domains/featureFlag/featureFlag.reducer',
  });
  const sagaIsInjected = useLazySaga({
    key: featureFlagSagaKey,
    path: 'shared/domains/featureFlag/featureFlag.saga',
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (
      reducerIsInjected && sagaIsInjected && !featureFlagsState.initialized && !isInitialized
    ) {
      dispatch(getFeatureFlagsAction());
      setIsInitialized(true);
    }
  }, [
    reducerIsInjected,
    sagaIsInjected,
    featureFlagsState.initialized,
    isInitialized,
    dispatch,
  ]);

  const getFeatureFlagById = (ffId: number): FeatureFlag | undefined => featureFlagsState.featureFlags.find((ff) => ff.id === ffId);

  return featureFlagsIds
    .filter(getFeatureFlagById)
    .map((ffId) => getFeatureFlagById(ffId)?.enable as boolean);
};
