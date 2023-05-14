import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useIdle from '../utilities/useIdle';
import { logoutAction } from '../../domains/authentification/authentification.action';

const useLogoutThenNIdleMinutes = (minutesToBeIdle = 30) : void => {
  const isIdle = useIdle(minutesToBeIdle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isIdle) dispatch(logoutAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIdle]);
};

export default useLogoutThenNIdleMinutes;
