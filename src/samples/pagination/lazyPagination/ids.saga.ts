import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getIdsFailedAction,
  getIdsSuccessAction,
  getPaginateIdsFailedAction,
  GetPaginateIdsRequestAction,
  getPaginateIdsSuccessAction,
  IdAction,
} from './ids.action';
import {
  getIds,
  getPaginateIds,
} from '../../../domains/lazyLoad/lazyPagination/pagination.api';
import { IPaginateResponse } from '../../../domains/lazyLoad/lazyPagination/pagination.model';

export function* getIdsSaga() {
  try {
    const movies: number[] = yield call(getIds);

    yield put(getIdsSuccessAction(movies));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(getIdsFailedAction(error.message));
  }
}

export function* getPaginateIdsSaga(action: GetPaginateIdsRequestAction) {
  try {
    const { page, pageSize } = action.payload;
    const paginateResponse: IPaginateResponse<number> = yield call(
      getPaginateIds,
      page,
      pageSize,
    );
    yield put(getPaginateIdsSuccessAction(paginateResponse));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(getPaginateIdsFailedAction(error.message));
  }
}

export default function* idsSaga(): Generator {
  yield takeLatest(IdAction.GET_IDS_REQUEST, getIdsSaga);
  yield takeLatest(IdAction.GET_PAGINATE_IDS_REQUEST, getPaginateIdsSaga);
}
