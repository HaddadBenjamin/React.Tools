import { ApplicationState } from '../../samples/lazyRedux/root.state';
import { AbTestState, initialAbTestsState } from './abTest.state';

const selectAbTestsState = (state: ApplicationState): AbTestState => state?.abTests ?? initialAbTestsState;

export default selectAbTestsState;
