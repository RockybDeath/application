import { initialIUserState } from './user.state';
import { IAppState } from '../../models/i-app-state';

export const initialAppState: IAppState = {
  users: initialIUserState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
