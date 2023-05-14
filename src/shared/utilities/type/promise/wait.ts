// eslint-disable-next-line no-promise-executor-return
export default (milliseconds: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, milliseconds));
