import { useSelector } from 'react-redux';
import selectAuthentification from '../authentification.selector';
import IAuthentificationState, { authentificationInitialState } from '../authentification.state';
import useSharedLocalStorage from '../../../shared/hooks/state/useSharedLocalStorage';

const useAuthentification = () : IAuthentificationState => {
  const authentificationFromStore = useSelector(selectAuthentification);
  const [authentificationFromLocalStorage] = useSharedLocalStorage('authentification', authentificationInitialState);

  return authentificationFromStore.parsedAccessToken !== undefined ? authentificationFromStore : authentificationFromLocalStorage;
};

export default useAuthentification;
