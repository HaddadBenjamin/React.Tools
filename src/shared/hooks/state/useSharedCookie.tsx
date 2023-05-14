import { useEffect } from 'react';
import getCookie from '../../utilities/state/cookies/getCookie';
import setCookie from '../../utilities/state/cookies/setCookie';
import { IDuration } from '../../utilities/type/date/addDuration';
import removeCookie from '../../utilities/state/cookies/removeCookie';
import useIsomorphicState from './useIsomorphicState';

const COOKIE_STORAGE_AREA = 'cookie';
type UseSharedCookieResponse = [string|undefined, (value: string) => void, () => void]

export const getSharedCookie = (key: string, duration: IDuration, valueIfUndefined?: string): string | undefined => {
  const value = getCookie(key);

  if (!value && valueIfUndefined) setSharedCookie(key, valueIfUndefined, duration);

  return value ?? valueIfUndefined;
};

export const setSharedCookie = (key : string, value: string, duration: IDuration) : void => {
  setCookie(key, value, duration);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.dispatchEvent(new StorageEvent('storage', { key, newValue: value, storageArea: COOKIE_STORAGE_AREA }));
};

export const removeSharedCookie = (key: string) => {
  removeCookie(key);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.dispatchEvent(new StorageEvent('storage', { key, newValue: undefined, storageArea: COOKIE_STORAGE_AREA }));
};

interface IUseSharedCookie {
  key: string,
  duration?: IDuration,
  valueIfUndefined?: string
}
const useSharedCookie = ({ key, duration = { days: 1 }, valueIfUndefined } : IUseSharedCookie) : UseSharedCookieResponse => {
  // Assure que vos variables sont différentes à travers vos différents sites, ex: test FR ou, test NC.
  const moreUniqueKey = `${key}_${process.env.NODE_ENV.toString()}_PUT_YOUR_LOCALE_HERE`;

  const get = () : string|undefined => getSharedCookie(moreUniqueKey, duration, valueIfUndefined);
  const set = (value: string) : void => setSharedCookie(moreUniqueKey, value, duration);
  const remove = () : void => removeSharedCookie(moreUniqueKey);

  const [value, setValue] = useIsomorphicState(get());

  const onStorageChange = ({ storageArea, key: eventKey, newValue }: StorageEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (storageArea === COOKIE_STORAGE_AREA && eventKey === moreUniqueKey && newValue) setValue(newValue);
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageChange);

    return () => { window.removeEventListener('storage', onStorageChange); };
  }, []);

  return [value, set, remove];
};

export default useSharedCookie;
