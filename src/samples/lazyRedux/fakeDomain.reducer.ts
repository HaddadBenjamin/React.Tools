import { FakeDomainState, initialFakeDomainState } from './fakeDomain.state';
import { FakeDomainAction, FakeDomainActions } from './fakeDomain.action';

const fakeDomainReducer = (
  state: FakeDomainState = initialFakeDomainState,
  action: FakeDomainActions,
): FakeDomainState => {
  switch (action.type) {
    case FakeDomainAction.GET_MESSAGE_REQUEST:
      return { error: undefined, message: undefined };
    case FakeDomainAction.GET_MESSAGE_SUCCESS:
      return { message: action.payload };
    case FakeDomainAction.GET_MESSAGE_FAILED:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export const fakeDomainReducerKey = 'fakeDomain';

export default fakeDomainReducer;
