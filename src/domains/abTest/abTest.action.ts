import { AbTest } from './abTest.model';

export enum AbTestAction {
  GET_AB_TEST_REQUEST = 'abTests/GET_AB_TEST_REQUEST',
  GET_AB_TEST_SUCCESS = 'abTests/GET_AB_TEST_SUCCESS',
  GET_AB_TEST_FAILED = 'abTests/GET_AB_TEST_FAILED',
}

export interface GetAbTestsRequestAction {
  type: AbTestAction.GET_AB_TEST_REQUEST;
}

export interface GetAbTestsSuccessAction {
  type: AbTestAction.GET_AB_TEST_SUCCESS;
  payload: AbTest[];
}

export interface GetAbTestsFailedAction {
  type: AbTestAction.GET_AB_TEST_FAILED;
  error: string;
}

export const getAbTestsAction = (): GetAbTestsRequestAction => ({
  type: AbTestAction.GET_AB_TEST_REQUEST,
});

export const getAbTestsSuccessAction = (
  payload: AbTest[],
): GetAbTestsSuccessAction => ({
  type: AbTestAction.GET_AB_TEST_SUCCESS,
  payload,
});

export const getAbTestsFailedAction = (
  error: string,
): GetAbTestsFailedAction => ({
  type: AbTestAction.GET_AB_TEST_FAILED,
  error,
});

export type AbTestActions =
  | GetAbTestsRequestAction
  | GetAbTestsSuccessAction
  | GetAbTestsFailedAction;
