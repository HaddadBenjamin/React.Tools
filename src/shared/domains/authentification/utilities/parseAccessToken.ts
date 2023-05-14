import { IAccessToken } from '../authentification.state';

const parseAccessToken = (token : string) : IAccessToken => JSON.parse(atob(token.split('.')[1]));

export default parseAccessToken;
