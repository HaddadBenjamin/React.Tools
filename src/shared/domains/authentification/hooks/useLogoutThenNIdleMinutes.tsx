import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logoutAction } from '../authentification.action';
import useIdle from '../../../hooks/utilities/useIdle';

const useLogoutThenNIdleMinutes = (minutesToBeIdle = 30) => {
  const isIdle = useIdle(minutesToBeIdle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isIdle) dispatch(logoutAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIdle]);
};

export default useLogoutThenNIdleMinutes;
