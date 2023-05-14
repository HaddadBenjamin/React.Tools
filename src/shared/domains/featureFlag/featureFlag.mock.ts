import { FeatureFlag } from './featureFlag.model';

export const featureFlagsMock: FeatureFlag[] = [
  {
    id: 1,
    name: 'ff-fake-domain',
    enable: true,
  },
  {
    id: 2,
    name: 'ff-fake-articles',
    enable: false,
  },
  {
    id: 3,
    name: 'ff-fake-todos',
    enable: true,
  },
];

export default featureFlagsMock;
