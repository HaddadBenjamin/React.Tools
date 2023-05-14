import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middlewares = composeWithDevTools({})(applyMiddleware(thunk));

export default middlewares;
