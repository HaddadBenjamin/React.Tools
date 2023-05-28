import { IApplicationState } from '../global-state/global-state.state';
import IAuthentificationState from './authentification.state';

const selectAuthentification = (state : IApplicationState) :
  IAuthentificationState => state.authentification;

export default selectAuthentification;
