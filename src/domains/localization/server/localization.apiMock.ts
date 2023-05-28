import { Express } from 'express';
import routes from './configuration';

export default (app: Express) => {
  app.route(routes.api).get((req, res) => {
    const language = req.header('Accept-Language');

    res.status(200);
    res.json(language === 'fr'
      ? 'Ce texte est traduit côté serveur grâce au header Accept-Language'
      : 'This text is translate from server side thanks the header Accept-Language');
  });
};
