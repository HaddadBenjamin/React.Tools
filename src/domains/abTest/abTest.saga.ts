import { call, put, takeLatest } from 'redux-saga/effects';

import {
  AbTestAction,
  getAbTestsFailedAction,
  getAbTestsSuccessAction,
} from './abTest.action';
import { AbTest } from './abTest.model';
import { getAbTests } from './abTest.api';

export function* getAbTestsSaga() {
  try {
    const abTests: AbTest[] = yield call(getAbTests);
    yield put(getAbTestsSuccessAction(abTests));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(getAbTestsFailedAction(error.message));
  }
}

export default function* todoSaga(): Generator {
  yield takeLatest(AbTestAction.GET_AB_TEST_REQUEST, getAbTestsSaga);
}
