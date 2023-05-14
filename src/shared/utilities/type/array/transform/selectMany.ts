// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const selectMany = <T, Y>(array: T[], callback: (element: T) => Y[]) : Y[] => array.flatMap(callback);

export default selectMany;
