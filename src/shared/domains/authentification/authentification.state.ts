/* eslint-disable semi, camelcase */
export default interface IAuthentificationState
{
  connected : boolean
  jwtToken? : IJwtToken
  parsedAccessToken? : IAccessToken
}

export interface IJwtToken
{
  access_token : string,
  expires_in : string,
  refresh_token : string,
  token_type : string,
  expires_on?: number
  id_token?: string
  id_token_expires_in?: number
  not_before?: number
  profile_info?: string
  refresh_token_expires_in?: number
  resource?: string
  scope?: string
}

export interface IAccessToken {
  aud : string,
  azp : string,
  exp : number, // date d'expiration du token
  // eslint-disable-next-line camelcase
  extension_ROLE : string,
  iat : number, // date de génération du token
  idp : string,
  iss : string,
  nbf : number,
  sub : string, // user id
  tfp : string,
  ver : string
}

export const authentificationInitialState : IAuthentificationState = {
  connected: false,
};
