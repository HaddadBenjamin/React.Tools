import { abTestsFrMock } from './abTest.mock';
import { AbTest } from './abTest.model';

export interface AbTestState {
  abTests: AbTest[];
  initialized: boolean;
  error?: string;
}

export const initialAbTestsState: AbTestState = {
  abTests: abTestsFrMock.map((ab) => ({ ...ab, enable: false })),
  initialized: false,
};
