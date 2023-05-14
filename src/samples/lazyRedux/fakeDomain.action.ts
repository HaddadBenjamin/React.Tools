export enum FakeDomainAction {
  GET_MESSAGE_REQUEST = 'todos/GET_MESSAGE_REQUEST',
  GET_MESSAGE_SUCCESS = 'todos/GET_MESSAGE_SUCCESS',
  GET_MESSAGE_FAILED = 'todos/GET_MESSAGE_FAILED',
}

export interface GetMessageRequestAction {
  type: FakeDomainAction.GET_MESSAGE_REQUEST;
}

export interface GetMessageSuccessAction {
  type: FakeDomainAction.GET_MESSAGE_SUCCESS;
  payload: string;
}

export interface GetMessageFailedAction {
  type: FakeDomainAction.GET_MESSAGE_FAILED;
  error: string;
}

export const getMessageRequestAction = (): GetMessageRequestAction => ({
  type: FakeDomainAction.GET_MESSAGE_REQUEST,
});

export const getMessageSuccessAction = (
  payload: string,
): GetMessageSuccessAction => ({
  type: FakeDomainAction.GET_MESSAGE_SUCCESS,
  payload,
});

export const getMessageFailedAction = (
  error: string,
): GetMessageFailedAction => ({
  type: FakeDomainAction.GET_MESSAGE_FAILED,
  error,
});

export type FakeDomainActions =
  | GetMessageRequestAction
  | GetMessageSuccessAction
  | GetMessageFailedAction;
