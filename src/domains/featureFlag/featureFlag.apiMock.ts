import { Express } from 'express';
import { featureFlagsMock } from './featureFlag.mock';
import { routes } from './featureFlag.configuration';

export default (app: Express) => {
  app.route(routes.api).get((req, res) => {
    res.status(200);
    res.json(featureFlagsMock);
  });
};
