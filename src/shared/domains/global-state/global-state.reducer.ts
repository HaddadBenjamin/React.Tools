import { combineReducers } from 'redux';
import authentificationReducer from '../authentification/authentification.reducer';

const rootReducer = combineReducers(
  {
    authentification: authentificationReducer,
  },
);

export default rootReducer;
