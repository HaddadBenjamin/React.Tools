import IAuthentificationState, { authentificationInitialState } from './authentification.state';
import removeLocalStorage from '../../shared/utilities/state/localStorage/removeLocalStorage';
import setLocalStorage from '../../shared/utilities/state/localStorage/setLocalStorage';
import getLocalStorage from '../../shared/utilities/state/localStorage/getLocalStorage';

const AUTHENTIFICATION_LOCAL_STORAGE_KEY = 'authentification';

export const getAuthentificationFromLocalStorage = () : IAuthentificationState => getLocalStorage(AUTHENTIFICATION_LOCAL_STORAGE_KEY, authentificationInitialState);

export const setAuthenticationFromLocalStorage = (authentificationState : IAuthentificationState) : void => setLocalStorage(AUTHENTIFICATION_LOCAL_STORAGE_KEY, authentificationState);

export const EMAIL_LOCAL_STORAGE_KEY = 'email';

export const getEmailFromLocalStorage = (initialEmail? : string) : string | undefined => getLocalStorage(EMAIL_LOCAL_STORAGE_KEY, initialEmail);

export const setEmailFromLocalStorage = (email? : string) : void => setLocalStorage(EMAIL_LOCAL_STORAGE_KEY, email);

export const removeEmailFromLocalStorage = () : void => removeLocalStorage(EMAIL_LOCAL_STORAGE_KEY);

export default AUTHENTIFICATION_LOCAL_STORAGE_KEY;
