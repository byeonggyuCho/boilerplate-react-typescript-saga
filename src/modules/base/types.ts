import { ActionType } from 'typesafe-actions';
import * as actions from './action';
import { MenuType, ROLE_MANU } from '@config';
export type BaseAction = ActionType<typeof actions>;

export interface StateBase {
  sidebar: {
    open: boolean;
    menu: string;
    subMenu?: string;
  };
  serverHealth: {
    status: boolean;
    message: string;
  };

  // 페이지 이동시 전달할 데이터를 임시 보관합니다. (router객체를 커스텀해도 되는지?)
  page: {
    data?: any;
    type?: string;
    mode?: 'eidt' | string;
  } | null;
  notification: Notification[];
  menuList: MenuType[];
}
