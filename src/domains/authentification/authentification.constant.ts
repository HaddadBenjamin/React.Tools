import qs from 'qs';

const LOGIN_ENDPOINT = 'url/login';
export const GET_REFRESH_TOKEN_ENDPOINT = 'url/getRefreshToken';
export const GET_USER_INFO_ENDPOINT = 'url/users/infos';

export default LOGIN_ENDPOINT;

export const KEYCLOAK_CLIENT_ID = 'BLABLA';

export interface IConnectionPopupEndPoint {
  code_challenge: string
  redirect_uri: string
}

export const GET_CONNEXION_POPUP_ENDPOINT = ({ redirect_uri, code_challenge }: IConnectionPopupEndPoint) : string => `BLABLA/realms/infogreffe/protocol/openid-connect/auth?${qs.stringify({
  client_id: KEYCLOAK_CLIENT_ID,
  response_type: 'code',
  code_challenge,
  code_challenge_method: 'S256',
  type: 'code',
  scope: 'openid',
  redirect_uri: `${window?.location?.origin}${redirect_uri ? `/${redirect_uri}` : ''}`,
})}`;

export const OPENID_CONNECT_TOKEN_ENDPOINT = `${process.env.GATSBY_API_KEYCLOAK}/realms/infogreffe/protocol/openid-connect/token`;
