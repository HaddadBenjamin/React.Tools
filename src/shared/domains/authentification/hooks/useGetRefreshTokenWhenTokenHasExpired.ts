import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAuthentification from './useAuthentification';
import { getRefreshTokenThunk } from '../authentification.thunk';

const useGetRefreshTokenWhenTokenHasExpired = () => {
  const { jwtToken, parsedAccessToken } = useAuthentification();
  const dispatch = useDispatch();

  useEffect(() => {
    if (parsedAccessToken && !!jwtToken?.refresh_token && Date.now() >= parsedAccessToken.exp * 1000) dispatch(getRefreshTokenThunk(jwtToken?.refresh_token));
  }, []);
};

export default useGetRefreshTokenWhenTokenHasExpired;
