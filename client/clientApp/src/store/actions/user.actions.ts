import { createAction, props } from '@ngrx/store';
import { UserActionsEnum } from '../../models/user-actions.enum';
import { IUser } from '../../models/i-user';

export const GetUser = createAction(
  UserActionsEnum.GetUser,
  props<{ payload: number }>()
);

export const GetUsers = createAction(UserActionsEnum.GetUsers);

export const GetUserSuccess = createAction(
  UserActionsEnum.GetUserSuccess,
  props<{ payload: IUser }>()
);

export const GetUsersSuccess = createAction(
  UserActionsEnum.GetUsersSuccess,
  props<{ payload: IUser[] }>()
);

export const GetUserError = createAction(
  UserActionsEnum.GetUserError,
  props<{ error: any }>()
);
