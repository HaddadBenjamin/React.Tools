export interface IDuration {
	years?: number;
	months?: number;
	days?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
	milliseconds?: number;
}

export const toDuration = (date: Date): IDuration => ({
  years: date.getFullYear(),
  months: date.getMonth(),
  days: date.getDate(),
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
  milliseconds: date.getMilliseconds(),
});

// Exemple :
// const future = addDuration(new Date(), {
//   months: 2,
//   days: 1,
//   minutes: 3,
// });
// Fonction pour ajouter une durée à une date
export const addDuration = (date: Date, {
  years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0,
}: IDuration): Date => new Date(
  date.getFullYear() + years,
  date.getMonth() + months,
  date.getDate() + days,
  date.getHours() + hours,
  date.getMinutes() + minutes,
  date.getSeconds() + seconds,
  date.getMilliseconds() + milliseconds,
);

// Fonction pour soustraire une durée d'une date
export const subtractDuration = (date: Date, {
  years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0,
}: IDuration): Date => new Date(
  date.getFullYear() - years,
  date.getMonth() - months,
  date.getDate() - days,
  date.getHours() - hours,
  date.getMinutes() - minutes,
  date.getSeconds() - seconds,
  date.getMilliseconds() - milliseconds,
);
