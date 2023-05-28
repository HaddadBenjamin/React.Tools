import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// eslint-disable-next-line
type ThunkDispatchType = ThunkDispatch<{}, {}, AnyAction>

export default ThunkDispatchType;
