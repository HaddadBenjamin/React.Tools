export interface IRemoveFalsiesValuesParameters {
removeUndefined?: boolean,
removeNull?: boolean,
removeEmpty?: boolean,
removeFalse?: boolean,
removeZero?: boolean,
removeNaN?: boolean
}

const removeFalsiesValues = <T, >(array: T[], {
  removeUndefined,
  removeNull,
  removeEmpty,
  removeFalse,
  removeZero,
  removeNaN,
}: IRemoveFalsiesValuesParameters = {
  removeUndefined: true,
  removeNull: true,
}) : T[] => array
  // eslint-disable-next-line no-restricted-globals
    .filter((item) => !((removeUndefined && item === undefined) || (removeNull && item === null) || (removeEmpty && item === '') || (removeFalse && item === false) || (removeZero && item === 0) || (removeNaN && isNaN(item as number))));

export default removeFalsiesValues;
