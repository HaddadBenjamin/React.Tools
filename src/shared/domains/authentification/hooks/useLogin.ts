import { useEffect, useState } from 'react';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { GET_CONNEXION_POPUP_ENDPOINT } from '../authentification.constant';
import { loginKeycloakThunk } from '../authentification.thunk';
import generateCodeVerifierAndCodeChallenge from '../utilities/generateCodeVerifierAndCodeChallenge';
import createPopup, { useListenPopupUrl } from '../../../utilities/htmlElement/createPopup';

interface IUseConnectParameters {
  redirect_uri: string,
  onSuccessOrError?: () => void
  onSuccess?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (httpStatus: number) => any
}

interface IUseConnectResponse {
  login: () => void
}

// login with a PKCE/Authorization code flow :
// 1) open 'openid-connect/auth' in a popup
// 2) Read the popup code query parameter
// 3) POST this code to 'openid-connect/token' to retrieve a new JWT Token.
const useLogin = (
  {
    redirect_uri,
    onSuccess,
    onError,
    onSuccessOrError,
  }: IUseConnectParameters): IUseConnectResponse => {
  const [popup, setPopup] = useState<Window | null>(null);
  const dispatch = useDispatch();
  const [[code_verifier, code_challenge], setCodeVerifierAndCodeChallenge] = useState(['', '']);

  useEffect(() => {
    (async () => { setCodeVerifierAndCodeChallenge(await generateCodeVerifierAndCodeChallenge()); })();
  }, []);

  useListenPopupUrl({
    popup,
    onPopupUrlChange: (popupUrl, intervalRef) => {
      dispatch(loginKeycloakThunk({
        code: qs.parse(popupUrl)?.code as string | undefined,
        code_verifier,
        redirect_uri,
        intervalRef,
        popup,
        setPopup,
        onSuccess,
        onError,
        onSuccessOrError,
      }));
    },
  });

  return {
    login: () => {
      const connexion_popup_endpoint = GET_CONNEXION_POPUP_ENDPOINT({ redirect_uri, code_challenge });
      const popup = createPopup({ url: connexion_popup_endpoint, popup: {} });

      setPopup(popup);
    },
  };
};

export default useLogin;
