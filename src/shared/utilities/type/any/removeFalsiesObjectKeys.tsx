/* eslint-disable no-tabs */
interface IRemoveFalsiesObjectKeys {
	removeNull? : boolean,
	removeUndefined?: boolean,
	removeEmptyString? : boolean
}

// exemple :removeFalsiesObjectKeys({ a : null, b: undefined, c: 'blabla' }) => { c : 'blabla' }
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const removeFalsiesObjectKeys = (object: any, parameters?: IRemoveFalsiesObjectKeys) : any => {
  const { removeNull, removeUndefined, removeEmptyString } = parameters ?? { removeNull: true, removeUndefined: true, removeEmptyString: false };

  return Object.fromEntries(Object.entries(object).filter(([, value]) => (removeNull ? value !== null : true && removeEmptyString ? value !== null : true && removeUndefined ? value !== undefined : true)));
};

export default removeFalsiesObjectKeys;
