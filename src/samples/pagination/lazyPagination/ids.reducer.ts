import { IdState, initialIdState } from './ids.state';
import { IdAction, IdActions } from './ids.action';

const idReducer = (
  state: IdState = initialIdState,
  action: IdActions,
): IdState => {
  switch (action.type) {
    case IdAction.GET_IDS_REQUEST:
      return { ...state, error: undefined };
    case IdAction.GET_IDS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        itemsCount: action.payload.length,
      };
    case IdAction.GET_IDS_FAILED:
      return { ...state, error: action.error };

    case IdAction.GET_PAGINATE_IDS_REQUEST:
      return { ...state, error: undefined };
    case IdAction.GET_PAGINATE_IDS_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        lastPage: action.payload.lastPage,
        itemsCount: action.payload.itemsCount,
      };
    case IdAction.GET_PAGINATE_IDS_FAILED:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default idReducer;
