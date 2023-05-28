import { IPaginateResponse } from '../../../domains/lazyLoad/lazyPagination/pagination.model';
import { ApplicationState } from '../../lazyRedux/root.state';

const selectPaginateResponse = (
  state: ApplicationState,
): IPaginateResponse<number> => ({ ...state.idsState });

export default selectPaginateResponse;
