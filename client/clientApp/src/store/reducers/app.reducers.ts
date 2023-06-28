import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../../models/i-app-state';
import { userReducers } from './user.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  users: userReducers,
};
