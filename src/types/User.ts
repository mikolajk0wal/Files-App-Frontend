import { UserType } from '../enums/UserType';

export interface UserInterface {
  _id: string;
  login: string;
  type: UserType;
  createdAt: string;
  updatedAt: string;
}
