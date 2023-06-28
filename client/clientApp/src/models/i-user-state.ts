import { IUser } from './i-user';

export interface IUserState {
  users: IUser[];
  selectedUser: IUser | undefined;
}
