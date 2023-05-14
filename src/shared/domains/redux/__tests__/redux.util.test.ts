import {
  failedActionMetadata,
  loadedActionMetadata,
  loadingActionMetadata,
} from '../redux.util';
import { ActionStatus } from '../redux.model';

describe('redux.util', () => {
  it('loadingActionMetadata should set status to loading and error to undefined', () => {
    // Given & When
    const loadingState = loadingActionMetadata({});

    // When
    expect(loadingState).toEqual(
      expect.objectContaining({
        status: ActionStatus.Loading,
        error: undefined,
      })
    );
  });

  it('loadedActionMetadata should set status to loaded and error to undefined', () => {
    // Given & When
    const loadedState = loadedActionMetadata({});

    // When
    expect(loadedState).toEqual(
      expect.objectContaining({
        status: ActionStatus.Loaded,
        error: undefined,
      })
    );
  });

  it('failedActionMetadata should set status to failed and set the error', () => {
    // Given & When
    const errorMessage = 'variable not defined';
    const loadedState = failedActionMetadata(errorMessage, {});

    // When
    expect(loadedState).toEqual(
      expect.objectContaining({
        status: ActionStatus.Failed,
        error: errorMessage,
      })
    );
  });
});
