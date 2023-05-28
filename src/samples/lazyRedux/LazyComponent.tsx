import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLazySaga from '../../shared/hooks/performance/useLazySaga';
import useLazyReducer from '../../shared/hooks/performance/useLazyReducer';
import { fakeDomainReducerKey } from './fakeDomain.reducer';
import { getMessageRequestAction } from './fakeDomain.action';
import selectMessage from './fakeDomain.selector';
import { fakeDomainSagaKey } from './fakeDomain.saga';
import useFeatureFlags from '../../domains/featureFlag/hooks/useFeatureFlags';
import { AbTestIds, FeatureFlagIds } from './fakeDomain.configuration';
import useAbTests from '../../domains/abTest/hooks/useAbTests';

const LazyComponent = () => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  const reducerIsInjected = useLazyReducer({
    key: fakeDomainReducerKey,
    path: 'samples/lazyRedux/fakeDomain.reducer',
  });
  const sagaIsInjected = useLazySaga({
    key: fakeDomainSagaKey,
    path: 'samples/lazyRedux/fakeDomain.saga',
  });
  const [featureFlagIsEnabled] = useFeatureFlags(FeatureFlagIds.fakeDomain);
  const [abTestIsEnabled] = useAbTests(AbTestIds.fakeDomain);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (
      sagaIsInjected
      && reducerIsInjected
      && featureFlagIsEnabled
      && abTestIsEnabled
      && !isInitialized
    ) {
      dispatch(getMessageRequestAction());
      setIsInitialized(true);
    }
  }, [
    sagaIsInjected,
    reducerIsInjected,
    featureFlagIsEnabled,
    abTestIsEnabled,
    isInitialized,
    dispatch,
  ]);

  return (
    <div>
      <div>
        Feature flag allow to enable or disable a feature depending some
        buisness condition and by environments
      </div>
      <div>
        AB test allow to enable or disable a feature depending some a platform
        (fr, en, it, ...) or a part of your users or some buisness condition and
        by environments
      </div>
      <div>
        Does reducer has been injected :
        {reducerIsInjected.toString()}
      </div>
      <div>
        Does saga has been injected :
        {sagaIsInjected.toString()}
      </div>
      <div>
        Does feature flag is enabled :
        {' '}
        {featureFlagIsEnabled.toString()}
      </div>
      <div>
        Does ab test is enabled :
        {abTestIsEnabled.toString()}
      </div>
      <div>
        Message from the store lazy loaded :
        {message}
      </div>
    </div>
  );
};

export default LazyComponent;
