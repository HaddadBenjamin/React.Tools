import IAuthentificationState, { authentificationInitialState } from '../authentification/authentification.state';

export interface IApplicationState
{
  authentification : IAuthentificationState
}

export const initialApplicationState : IApplicationState = {
  authentification: authentificationInitialState,
};
