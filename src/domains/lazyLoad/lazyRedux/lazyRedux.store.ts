import {
  combineReducers,
  Reducer,
  ReducersMapObject,
  createStore,
  StoreEnhancer,
  PreloadedState,
  Store,
} from 'redux';
import { Saga, Task, SagaMiddleware } from 'redux-saga';
import { ILazyStore } from './lazyRedux.model';

class LazyStore<TApplicationState> implements ILazyStore {
  store: Store;

  defaultReducers: Reducer;

  sagaMiddleware: SagaMiddleware;

  injectedSagas: Map<string, Task>;

  injectedReducers: ReducersMapObject;

  constructor(
    defaultReducers: Reducer,
    initialApplicationState: PreloadedState<TApplicationState>,
    middlewares: StoreEnhancer,
    sagaMiddleware: SagaMiddleware,
    rootSagas: Saga,
  ) {
    this.defaultReducers = defaultReducers;
    this.sagaMiddleware = sagaMiddleware;
    this.injectedReducers = {};

    this.store = createStore(
      this.createRootReducer(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initialApplicationState,
      middlewares,
    );

    this.injectedSagas = new Map<string, Task>([
      ['root', sagaMiddleware.run(rootSagas)],
    ]);
  }

  createRootReducer = (lazyReducers?: ReducersMapObject): Reducer => combineReducers({ ...this.defaultReducers, ...lazyReducers });

  injectReducer = (key: string, reducer: Reducer): void => {
    if (this.doesReducerHasBeenInjected(key)) return;

    this.injectedReducers[key] = reducer;
    this.store.replaceReducer(this.createRootReducer(this.injectedReducers));
  };

  injectSaga = (key: string, saga: Saga): void => {
    if (this.doesSagaHasBeenInjected(key)) return;

    const task = this.sagaMiddleware.run(saga);

    this.injectedSagas.set(key, task);
  };

  doesReducerHasBeenInjected = (key: string): boolean => Object.hasOwnProperty.call(this.injectedReducers, key);

  doesSagaHasBeenInjected = (key: string): boolean => this.injectedSagas.has(key);
}

export default LazyStore;
