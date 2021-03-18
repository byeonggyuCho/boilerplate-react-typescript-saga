import reducer from './reducer';
import saga from './saga';

import * as actions from './action';

export default {
  reducer,
  saga,
  actions,
};

export interface User {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  email: string;
  name: string;
  phone: string;
  isPushAlarm: boolean;
  profileImage: string;
  notification: string;
}

export type UserType = {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'F' | 'M';
  email: string;
  name: string;
  phone: string;
  isPushAlarm: boolean;
  profileImage: string;
  notification: string;
};

export type LoginRes = {
  accessToken: string;
  user: UserType;
};

export type LoginForm = {
  username: string;
  password: string;
};
