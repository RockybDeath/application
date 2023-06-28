import { initialIUserState } from '../state/user.state';
import { GetUsersSuccess, GetUserSuccess } from '../actions/user.actions';
import { createReducer, on } from '@ngrx/store';

export const userReducers = createReducer(
  initialIUserState,
  on(GetUsersSuccess, (state, { payload }) => ({
    ...state,
    users: payload,
  })),
  on(GetUserSuccess, (state, { payload }) => ({
    ...state,
    selectedUser: payload,
  }))
);
