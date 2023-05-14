import { Reducer, ReducersMapObject, Store } from 'redux';
import { Saga, SagaMiddleware, Task } from 'redux-saga';

export interface ILazyStore {
  store: Store;
  defaultReducers: Reducer;
  sagaMiddleware: SagaMiddleware;
  injectedReducers: ReducersMapObject;
  injectedSagas: Map<string, Task>;

  createRootReducer: (lazyReducers?: ReducersMapObject) => Reducer;
  injectReducer: (key: string, reducer: Reducer) => void;
  injectSaga: (key: string, saga: Saga) => void;

  doesReducerHasBeenInjected: (key: string) => boolean;
  doesSagaHasBeenInjected: (key: string) => boolean;
}
