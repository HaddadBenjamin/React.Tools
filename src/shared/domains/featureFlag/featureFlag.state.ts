import { featureFlagsMock } from './featureFlag.mock';
import { FeatureFlag } from './featureFlag.model';

export interface FeatureFlagState {
  featureFlags: FeatureFlag[];
  initialized: boolean;
  error?: string;
}

export const initialFeatureFlagsState: FeatureFlagState = {
  featureFlags: featureFlagsMock.map((ff) => ({ ...ff, enable: false })),
  initialized: false,
};
