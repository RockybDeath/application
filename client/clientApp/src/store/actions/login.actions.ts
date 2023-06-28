import { createAction, props } from '@ngrx/store';
import { LoginActionsEnum } from '../../models/login-actions.enum';

export const Login = createAction(
  LoginActionsEnum.Login,
  props<{ username: string; password: string }>()
);

export const LoginActions = typeof Login;
