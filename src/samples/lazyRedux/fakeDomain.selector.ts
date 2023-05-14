import { ApplicationState } from './root.state';

const selectMessage = (state: ApplicationState): string | undefined => state?.fakeDomain?.message;

export default selectMessage;
