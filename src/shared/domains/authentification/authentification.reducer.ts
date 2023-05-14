import IAuthentificationState, { authentificationInitialState } from './authentification.state';
import { AuthentificationAction, AuthentificationActions } from './authentification.action';
import parseAccessToken from './utilities/parseAccessToken';
import { setAuthenticationFromLocalStorage } from './authentification.local-storage';

const authentificationReducer = (
  state : IAuthentificationState = authentificationInitialState,
  action : AuthentificationActions,
) : IAuthentificationState => {
  switch (action.type) {
    case AuthentificationAction.LOGIN_REQUEST: return {
      ...state,
    };

    case AuthentificationAction.LOGIN_SUCCESS: {
      const newAuthentificationState : IAuthentificationState = {
        ...state,
        connected: true,
        jwtToken: action.payload,
        parsedAccessToken: parseAccessToken(action.payload.access_token),
      };

      setAuthenticationFromLocalStorage(newAuthentificationState);

      return newAuthentificationState;
    }

    case AuthentificationAction.LOGIN_FAILED: {
      const newAuthentificationState : IAuthentificationState = {
        ...state,
        connected: false,
        jwtToken: undefined,
        parsedAccessToken: undefined,
      };

      setAuthenticationFromLocalStorage(newAuthentificationState);

      return newAuthentificationState;
    }

    case AuthentificationAction.GET_REFRESH_TOKEN_SUCCESS: {
      const newAuthentificationState : IAuthentificationState = {
        ...state,
        connected: true,
        jwtToken: action.payload,
        parsedAccessToken: parseAccessToken(action.payload.access_token),
      };

      setAuthenticationFromLocalStorage(newAuthentificationState);

      return newAuthentificationState;
    }

    case AuthentificationAction.GET_REFRESH_TOKEN_FAILED: {
      const newAuthentificationState : IAuthentificationState = {
        ...state,
        connected: false,
        jwtToken: undefined,
        parsedAccessToken: undefined,
      };

      setAuthenticationFromLocalStorage(newAuthentificationState);

      return newAuthentificationState;
    }

    case AuthentificationAction.LOGOUT: {
      const newAuthentificationState : IAuthentificationState = {
        ...state,
        connected: false,
        jwtToken: undefined,
        parsedAccessToken: undefined,
      };

      setAuthenticationFromLocalStorage(newAuthentificationState);

      return newAuthentificationState;
    }

    default: return state;
  }
};

export default authentificationReducer;
