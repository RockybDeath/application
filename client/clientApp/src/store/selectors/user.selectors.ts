import { IAppState } from '../../models/i-app-state';
import { createSelector } from '@ngrx/store';
import { IUserState } from '../../models/i-user-state';

const selectUsers = (state: IAppState) => state.users;

export const selectUserList = createSelector(
  selectUsers,
  (state: IUserState) => state.users
);

export const selectSelectedUser = createSelector(
  selectUsers,
  (state: IUserState) => state.selectedUser
);
