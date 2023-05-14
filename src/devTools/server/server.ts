// import express from 'express';
// import cors from 'cors';
// import loadApiMocks from './server.util';
//
// const PORT = 3001;
// const app = express();
//
// app.use(express.json());
// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
//     exposedHeaders: ['link', 'x-total-count'],
//   }),
// );
//
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const generateSwaggerOpenApi = require('express-oas-generator');
//
// generateSwaggerOpenApi.init(app, {});
//
// // eslint-disable-next-line @typescript-eslint/no-misused-promises
// app.listen(PORT, async () => {
//   console.log( // eslint-disable-line
//     `%c API mocks listening http://localhost:${PORT}/api-docs/`,
//     'background: #222; color: #bada55',
//   );
//   await loadApiMocks(app);
// });
export {};
