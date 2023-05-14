/* eslint-disable no-restricted-syntax,@typescript-eslint/no-non-null-asserted-optional-chain,no-tabs,no-undef,@typescript-eslint/no-non-null-assertion */
const durationMap : [string, number][] = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].map((k, i) => [k, i]);
const durationStringToDurationIndex = (durationString: string) : number => durationMap.find(([key]) => key === durationString)?.[1]!;

export interface IDuration {
	years?: number
	months?: number
	days?: number
	hours?: number
	minutes?: number
	seconds?: number
	milliseconds?: number
}

// Exemple :
// const future = addDuration(new Date(), {
//   months: 2,
//   days: 1,
//   minutes: 3,
// });
const addDuration = (date : Date, duration: IDuration) => {
  const dateDurations = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];

  for (const [key, value] of Object.entries(duration)) dateDurations[durationStringToDurationIndex(key)] += value;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new Date(...parts);
};

export default addDuration;
