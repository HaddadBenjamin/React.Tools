import { Express } from 'express';
import { abTestsFrMock, abTestsOtherLanguageMock } from './abTest.mock';
import { routes } from './abTest.configuration';

export default (app: Express) => {
  app.route(routes.api).get((req, res) => {
    const platform = req.headers.platform as string;

    res.status(200);
    res.json(platform === 'FR' ? abTestsFrMock : abTestsOtherLanguageMock);
  });
};
