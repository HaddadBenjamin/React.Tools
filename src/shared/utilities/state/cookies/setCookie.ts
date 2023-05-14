import addDuration, { IDuration } from '../../type/date/addDuration';

// eslint-disable-next-line no-return-assign
const setCookie = (name: string, value: string, duration: IDuration) : string => document.cookie = `${name}=${encodeURIComponent(value)}; expires=${addDuration(new Date(), duration).toUTCString()};`;

export default setCookie;
