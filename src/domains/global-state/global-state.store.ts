import { createStore } from 'redux';
import { initialApplicationState } from './global-state.state';
import middlewares from './global-state.middleware';
import rootReducer from './global-state.reducer';

const store = createStore(rootReducer, initialApplicationState, middlewares);

export default store;
