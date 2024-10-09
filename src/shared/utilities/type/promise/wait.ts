// eslint-disable-next-line no-promise-executor-return
export default async (milliseconds: number = 1000): Promise<void> =>
  await new Promise(resolve => setTimeout(resolve, milliseconds));
