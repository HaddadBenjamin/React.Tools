import { FeatureFlag } from './featureFlag.model';

export enum FeatureFlagAction {
  GET_FEATURE_FLAG_REQUEST = 'featureFlags/GET_FEATURE_FLAG_REQUEST',
  GET_FEATURE_FLAG_SUCCESS = 'featureFlags/GET_FEATURE_FLAG_SUCCESS',
  GET_FEATURE_FLAG_FAILED = 'featureFlags/GET_FEATURE_FLAG_FAILED',
}

export interface GetFeatureFlagsRequestAction {
  type: FeatureFlagAction.GET_FEATURE_FLAG_REQUEST;
}

export interface GetFeatureFlagsSuccessAction {
  type: FeatureFlagAction.GET_FEATURE_FLAG_SUCCESS;
  payload: FeatureFlag[];
}

export interface GetFeatureFlagsFailedAction {
  type: FeatureFlagAction.GET_FEATURE_FLAG_FAILED;
  error: string;
}

export const getFeatureFlagsAction = (): GetFeatureFlagsRequestAction => ({
  type: FeatureFlagAction.GET_FEATURE_FLAG_REQUEST,
});

export const getFeatureFlagsSuccessAction = (
  payload: FeatureFlag[],
): GetFeatureFlagsSuccessAction => ({
  type: FeatureFlagAction.GET_FEATURE_FLAG_SUCCESS,
  payload,
});

export const getFeatureFlagsFailedAction = (
  error: string,
): GetFeatureFlagsFailedAction => ({
  type: FeatureFlagAction.GET_FEATURE_FLAG_FAILED,
  error,
});

export type FeatureFlagActions =
  | GetFeatureFlagsRequestAction
  | GetFeatureFlagsSuccessAction
  | GetFeatureFlagsFailedAction;
