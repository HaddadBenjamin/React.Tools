import { MutableRefObject } from 'react';
import login, { getKeycloakToken, getRefreshToken } from './authentification.api';
import {
  getRefreshTokenFailedAction,
  getRefreshTokenRequestAction, getRefreshTokenSuccessAction,
  loginFailedAction,
  loginRequestAction,
  loginSuccessAction,
} from './authentification.action';
import LoginActionPayload from './authentification.model';
import ThunkDispatchType from '../global-state/global-state.model';

const loginThunk = (payload : LoginActionPayload) => async (dispatch : ThunkDispatchType) => {
  try {
    dispatch(loginRequestAction());

    const jwtToken = await login(payload);
    dispatch(loginSuccessAction(jwtToken));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispatch(loginFailedAction(error.message));
  }
};

interface ILoginKeycloakThunk {
  code?: string,
  code_verifier: string,
  redirect_uri: string,
  intervalRef: MutableRefObject<number | undefined>,
  popup: Window | null,
  setPopup: (popup: Window | null) => void,
  onSuccessOrError?: () => void
  onSuccess?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (httpStatus: number) => any
}

// login with a PKCE/Authorization code flow :
// 1) open 'openid-connect/auth' in a popup
// 2) Read the popup code query parameter
// 3) POST this code to 'openid-connect/token' to retrieve a new JWT Token.
export const loginKeycloakThunk = (
  {
    code,
    code_verifier,
    redirect_uri,
    intervalRef,
    popup,
    setPopup,
    onSuccess,
    onError,
    onSuccessOrError,
  }: ILoginKeycloakThunk) => (dispatch: ThunkDispatchType) => {
  dispatch(loginRequestAction());

  getKeycloakToken({ code, redirect_uri, code_verifier })
    .then((jwtToken) => {
      clearInterval(intervalRef.current);
      dispatch(loginSuccessAction(jwtToken.data));
      onSuccess?.();
    })
    .catch((error) => {
      loginFailedAction(error.message);
      onError?.(error.response);
    })
    .finally(() => {
      popup?.close();
      setPopup(null);
      onSuccessOrError?.();
      clearInterval(intervalRef.current);
    });
};

export const getRefreshTokenThunk = (refreshToken: string) => (dispatch: ThunkDispatchType) => {
  dispatch(getRefreshTokenRequestAction());

  getRefreshToken({ refreshToken })
    .then((data) => dispatch(getRefreshTokenSuccessAction(data)))
    .catch((error) => dispatch(getRefreshTokenFailedAction(error.message)));
};

export default loginThunk;
