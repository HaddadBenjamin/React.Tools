import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import { sagaMiddleware } from './root.saga';

const middlewares = composeWithDevTools({})(applyMiddleware(sagaMiddleware));

export default middlewares;
