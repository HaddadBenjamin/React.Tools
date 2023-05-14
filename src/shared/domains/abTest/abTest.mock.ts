import { AbTest } from './abTest.model';

export const abTestsFrMock: AbTest[] = [
  {
    id: 1,
    name: 'ab-fake-domain',
    enable: true,
  },
  {
    id: 2,
    name: 'ab-fake-articles',
    enable: false,
  },
  {
    id: 3,
    name: 'ab-fake-todos',
    enable: true,
  },
];

export const abTestsOtherLanguageMock: AbTest[] = [
  {
    id: 1,
    name: 'ab-fake-domain',
    enable: false,
  },
  {
    id: 2,
    name: 'ab-fake-articles',
    enable: false,
  },
  {
    id: 3,
    name: 'ab-fake-todos',
    enable: true,
  },
];
