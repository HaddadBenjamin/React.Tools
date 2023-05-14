export enum ActionStatus {
  Loading = 'Loading',
  Loaded = ' Loaded',
  Failed = 'Failed',
}

export interface IActionMetadata {
  status: ActionStatus;
  error: string | undefined;
}
