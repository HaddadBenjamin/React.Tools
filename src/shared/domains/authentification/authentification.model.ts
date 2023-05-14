interface LoginActionPayload {
  userName : string,
  password : string,
}

export interface IGetRefreshTokenPayload {
  refreshToken : string,
}

export interface IGetUserInfoResponse {
  nom? : string,
  prenom? : string,
  roles? : string[]
}

export default LoginActionPayload;
