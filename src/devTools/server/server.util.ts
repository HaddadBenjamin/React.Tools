// import glob from "glob";
// import path from "path";
// import { Express } from "express";
//
// const getApiMockPaths = async () =>
//   await new Promise<string[]>((resolve, reject) =>
//     glob(path.join(process.cwd(), "src/**/*.apiMock.ts"), (error, files) =>
//       resolve(files)
//     )
//   );
//
// const loadApiMocks = async (app: Express) => {
//   const apiMockPaths = await getApiMockPaths();
//
//   await Promise.all(
//     apiMockPaths.map(async (apiMockPath: string) =>
//       (await import(apiMockPath)).default(app)
//     )
//   );
// };
//
// export default loadApiMocks;
export {};
