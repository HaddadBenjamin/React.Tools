import { IPaginateResponse } from '../../../domains/lazyLoad/lazyPagination/pagination.model';

export enum IdAction {
  GET_IDS_REQUEST = 'ids/GET_IDS_REQUEST',
  GET_IDS_SUCCESS = 'ids/GET_IDS_SUCCESS',
  GET_IDS_FAILED = 'ids/GET_IDS_FAILED',

  GET_PAGINATE_IDS_REQUEST = 'ids/GET_PAGINATE_IDS_REQUEST',
  GET_PAGINATE_IDS_SUCCESS = 'ids/GET_PAGINATE_IDS_SUCCESS',
  GET_PAGINATE_IDS_FAILED = 'ids/GET_PAGINATE_IDS_FAILED',
}

export interface GetIdsRequestAction {
  type: IdAction.GET_IDS_REQUEST;
}

export interface GetIdsSuccessAction {
  type: IdAction.GET_IDS_SUCCESS;
  payload: number[];
}

export interface GetIdsFailedAction {
  type: IdAction.GET_IDS_FAILED;
  error: string;
}

export interface GetPaginateIdsRequestAction {
  type: IdAction.GET_PAGINATE_IDS_REQUEST;
  payload: { page: number; pageSize: number };
}

export interface GetPaginateIdsSuccessAction {
  type: IdAction.GET_PAGINATE_IDS_SUCCESS;
  payload: IPaginateResponse<number>;
}

export interface GetPaginateIdsFailedAction {
  type: IdAction.GET_PAGINATE_IDS_FAILED;
  error: string;
}

export const getIdsRequestAction = (): GetIdsRequestAction => ({
  type: IdAction.GET_IDS_REQUEST,
});

export const getIdsSuccessAction = (
  payload: number[],
): GetIdsSuccessAction => ({
  type: IdAction.GET_IDS_SUCCESS,
  payload,
});

export const getIdsFailedAction = (error: string): GetIdsFailedAction => ({
  type: IdAction.GET_IDS_FAILED,
  error,
});

export const getPaginateIdsRequestAction = (
  page: number,
  pageSize: number,
): GetPaginateIdsRequestAction => ({
  type: IdAction.GET_PAGINATE_IDS_REQUEST,
  payload: { page, pageSize },
});

export const getPaginateIdsSuccessAction = (
  payload: IPaginateResponse<number>,
): GetPaginateIdsSuccessAction => ({
  type: IdAction.GET_PAGINATE_IDS_SUCCESS,
  payload,
});

export const getPaginateIdsFailedAction = (
  error: string,
): GetPaginateIdsFailedAction => ({
  type: IdAction.GET_PAGINATE_IDS_FAILED,
  error,
});

export type IdActions =
  | GetIdsRequestAction
  | GetIdsSuccessAction
  | GetIdsFailedAction
  | GetPaginateIdsRequestAction
  | GetPaginateIdsSuccessAction
  | GetPaginateIdsFailedAction;
