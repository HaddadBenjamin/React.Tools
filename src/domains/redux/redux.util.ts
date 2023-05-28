import { ActionStatus, IActionMetadata } from './redux.model';

export const loadingActionMetadata = <State>(
  state: State,
): State & IActionMetadata => ({
    ...state,
    error: undefined,
    status: ActionStatus.Loading,
  });

export const loadedActionMetadata = <State>(
  state: State,
): State & IActionMetadata => ({
    ...state,
    error: undefined,
    status: ActionStatus.Loaded,
  });

export const failedActionMetadata = <State>(
  error: string,
  state: State,
): State & IActionMetadata => ({
    ...state,
    error,
    status: ActionStatus.Failed,
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const excludeSagaPayloadFn = (saga: any) => expect.objectContaining({
  ...saga,
  payload: {
    ...saga.payload,
    fn: undefined,
  },
});
