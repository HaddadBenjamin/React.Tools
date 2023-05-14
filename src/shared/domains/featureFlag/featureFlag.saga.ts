import { call, put, takeLatest } from 'redux-saga/effects';

import {
  FeatureFlagAction,
  getFeatureFlagsFailedAction,
  getFeatureFlagsSuccessAction,
} from './featureFlag.action';
import { FeatureFlag } from './featureFlag.model';
import { getFeatureFlags } from './featureFlag.api';

export function* getFeatureFlagsSaga() {
  try {
    const featureFlags: FeatureFlag[] = yield call(getFeatureFlags);
    yield put(getFeatureFlagsSuccessAction(featureFlags));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(getFeatureFlagsFailedAction(error.message));
  }
}

export default function* todoSaga(): Generator {
  yield takeLatest(
    FeatureFlagAction.GET_FEATURE_FLAG_REQUEST,
    getFeatureFlagsSaga,
  );
}
