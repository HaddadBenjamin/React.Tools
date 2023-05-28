import {
  FeatureFlagState,
  initialFeatureFlagsState,
} from './featureFlag.state';
import { FeatureFlagActions, FeatureFlagAction } from './featureFlag.action';

const featureFlagReducer = (
  state: FeatureFlagState = initialFeatureFlagsState,
  action: FeatureFlagActions,
): FeatureFlagState => {
  switch (action.type) {
    case FeatureFlagAction.GET_FEATURE_FLAG_REQUEST:
      return { ...state, error: undefined };
    case FeatureFlagAction.GET_FEATURE_FLAG_SUCCESS:
      return { ...state, featureFlags: action.payload, initialized: true };
    case FeatureFlagAction.GET_FEATURE_FLAG_FAILED:
      return { ...state, error: action.error };

    default:
      return state;
  }
};
export default featureFlagReducer;
