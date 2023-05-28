import { AbTestState, initialAbTestsState } from './abTest.state';
import { AbTestActions, AbTestAction } from './abTest.action';

const abTestReducer = (
  state: AbTestState = initialAbTestsState,
  action: AbTestActions,
): AbTestState => {
  switch (action.type) {
    case AbTestAction.GET_AB_TEST_REQUEST:
      return { ...state, error: undefined };
    case AbTestAction.GET_AB_TEST_SUCCESS:
      return { ...state, abTests: action.payload, initialized: true };
    case AbTestAction.GET_AB_TEST_FAILED:
      return { ...state, error: action.error };

    default:
      return state;
  }
};
export default abTestReducer;
