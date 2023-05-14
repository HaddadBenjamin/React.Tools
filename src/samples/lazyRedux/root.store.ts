import LazyStore from '../../shared/domains/redux/lazyRedux/lazyRedux.store';
import { initialApplicationState } from './root.state';
import defaultReducers from './root.reducer';
import middlewares from './root.middleware';
import rootSagas, { sagaMiddleware } from './root.saga';

export const lazyStore = new LazyStore(
  defaultReducers,
  initialApplicationState,
  middlewares,
  sagaMiddleware,
  rootSagas,
);

const { store } = lazyStore;

export default store;
