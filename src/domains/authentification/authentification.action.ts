/* eslint-disable no-unused-vars */
import { IJwtToken } from './authentification.state';

export enum AuthentificationAction {
  LOGIN_REQUEST = 'authentification/LOGIN_REQUEST',
  LOGIN_SUCCESS = 'authentification/LOGIN_SUCCESS',
  LOGIN_FAILED = 'authentification/LOGIN_FAILED',

  GET_REFRESH_TOKEN_REQUEST = 'authentification/GET_REFRESH_TOKEN_REQUEST',
  GET_REFRESH_TOKEN_SUCCESS = 'authentification/GET_REFRESH_TOKEN_SUCCESS',
  GET_REFRESH_TOKEN_FAILED = 'authentification/GET_REFRESH_TOKEN_FAILED',

  LOGOUT = 'authentification/LOGOUT',
}

export interface LoginRequestAction {
  type : AuthentificationAction.LOGIN_REQUEST,
}

export interface LoginSuccessAction {
  type : AuthentificationAction.LOGIN_SUCCESS,
  payload : IJwtToken
}

export interface LoginFailedAction {
  type : AuthentificationAction.LOGIN_FAILED,
  error : string
}

export interface GetRefreshTokenRequestAction {
  type : AuthentificationAction.GET_REFRESH_TOKEN_REQUEST,
}

export interface GetRefreshTokenSuccessAction {
  type : AuthentificationAction.GET_REFRESH_TOKEN_SUCCESS,
  payload : IJwtToken
}

export interface GetRefreshTokenFailedAction {
  type : AuthentificationAction.GET_REFRESH_TOKEN_FAILED,
  error : string
}

export interface LogoutAction {
  type : AuthentificationAction.LOGOUT
}

export const loginRequestAction = () : LoginRequestAction => ({
  type: AuthentificationAction.LOGIN_REQUEST,
});

export const loginSuccessAction = (payload : IJwtToken) : LoginSuccessAction => ({
  type: AuthentificationAction.LOGIN_SUCCESS,
  payload,
});

export const loginFailedAction = (error : string) : LoginFailedAction => ({
  type: AuthentificationAction.LOGIN_FAILED,
  error,
});

export const getRefreshTokenRequestAction = () : GetRefreshTokenRequestAction => ({
  type: AuthentificationAction.GET_REFRESH_TOKEN_REQUEST,
});

export const getRefreshTokenSuccessAction = (payload : IJwtToken) :
  GetRefreshTokenSuccessAction => ({
  type: AuthentificationAction.GET_REFRESH_TOKEN_SUCCESS,
  payload,
});

export const getRefreshTokenFailedAction = (error : string) : GetRefreshTokenFailedAction => ({
  type: AuthentificationAction.GET_REFRESH_TOKEN_FAILED,
  error,
});

export const logoutAction = () : LogoutAction => ({
  type: AuthentificationAction.LOGOUT,
});

export type AuthentificationActions =
  LoginRequestAction |
  LoginSuccessAction |
  LoginFailedAction |

  GetRefreshTokenRequestAction |
  GetRefreshTokenSuccessAction |
  GetRefreshTokenFailedAction |

  LogoutAction
