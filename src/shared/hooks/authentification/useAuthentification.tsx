import { useSelector } from 'react-redux';
import IAuthentificationState, { authentificationInitialState } from '../../../domains/authentification/authentification.state';
import selectAuthentification from '../../../domains/authentification/authentification.selector';
import useSharedLocalStorage from '../state/useSharedLocalStorage';

const useAuthentification = () : IAuthentificationState => {
  const authentificationFromStore = useSelector(selectAuthentification);
  const [authentificationFromLocalStorage] = useSharedLocalStorage('authentification', authentificationInitialState);

  return authentificationFromStore.parsedAccessToken !== undefined ? authentificationFromStore : authentificationFromLocalStorage;
};

export default useAuthentification;
