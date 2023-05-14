// eslint-disable-next-line no-return-assign
const removeCookie = (name: string) : string => document.cookie = `${name}=; Max-Age=-99999999;`;

export default removeCookie;
