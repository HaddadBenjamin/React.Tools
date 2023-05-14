/* eslint-disable camelcase,no-tabs */
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import LoginActionPayload, { IGetRefreshTokenPayload } from './authentification.model';
import { IJwtToken } from './authentification.state';
import LOGIN_ENDPOINT, {
  GET_REFRESH_TOKEN_ENDPOINT,
  KEYCLOAK_CLIENT_ID,
  OPENID_CONNECT_TOKEN_ENDPOINT,
} from './authentification.constant';
import utf8ToBase64 from '../../utilities/type/string/utf8ToBase64';
import XWwwFormUrlencoded from '../../utilities/http/x-www-form-urlencoded';

const login = async ({ userName, password } : LoginActionPayload) : Promise<IJwtToken> => (await axios.get(`${LOGIN_ENDPOINT}?${qs.stringify({ userName, password })}`)).data;

export default login;

export const getRefreshToken = async ({ refreshToken } : IGetRefreshTokenPayload) : Promise<IJwtToken> => (await axios.get(`${GET_REFRESH_TOKEN_ENDPOINT}?${qs.stringify({ refreshToken })}`)).data;

export interface IGetKeycloakToken {
	code?: string,
	code_verifier: string
	redirect_uri: string,
}

export const getKeycloakToken = ({ code, redirect_uri, code_verifier } : IGetKeycloakToken) : Promise<AxiosResponse<IJwtToken>> => axios.post<IJwtToken>(OPENID_CONNECT_TOKEN_ENDPOINT, XWwwFormUrlencoded({
  code,
  code_verifier,
  redirect_uri: `${window?.location?.origin}${redirect_uri ? `/${redirect_uri}` : ''}`,
  client_id: KEYCLOAK_CLIENT_ID,
  grant_type: 'authorization_code',
}), {
  headers: {
    Authorization: `Basic ${utf8ToBase64(`${KEYCLOAK_CLIENT_ID}:`)}`,
  },
});
