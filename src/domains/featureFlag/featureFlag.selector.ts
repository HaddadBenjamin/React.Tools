import { ApplicationState } from '../../samples/lazyRedux/root.state';
import {
  FeatureFlagState,
  initialFeatureFlagsState,
} from './featureFlag.state';

const selectFeatureFlagsState = (state: ApplicationState): FeatureFlagState => state?.featureFlags ?? initialFeatureFlagsState;

export default selectFeatureFlagsState;
