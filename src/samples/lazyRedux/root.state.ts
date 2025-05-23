import { FeatureFlagState } from '../../domains/featureFlag/featureFlag.state';
import { AbTestState } from '../../domains/abTest/abTest.state';
import { IdState, initialIdState } from '../pagination/lazyPagination/ids.state';
import { FakeDomainState } from './fakeDomain.state';

/* eslint-disable no-tabs */
export interface ApplicationState {
	idsState: IdState;
	fakeDomain?: FakeDomainState;
	featureFlags?: FeatureFlagState;
	abTests?: AbTestState;
}

export const initialApplicationState: ApplicationState = {
  idsState: initialIdState,
};
