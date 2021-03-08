import { createSelector } from 'reselect';
import { RootState } from '@modules';
import { Authority } from '@models/auth';

/**
 * @description
 * input selector를 여러개 지정할 수 있다.
 */
const selectModal = (state: RootState) => state.base.modal;

const selectMenuName = (
  state: RootState,
  navMenuName: 'admin' | 'store' | 'payment'
) => navMenuName;

const selectMenu = (state: RootState) => state.base.menuList;

const selectEnteredStroe = (state: RootState, navMenuName: string) =>
  state.store.enteredStore?.storeId;

const selectByModalName = (state: RootState, modalName: string[]) => modalName;

export const getModalInfoByModalName = createSelector(
  [selectModal, selectByModalName],
  (modal, modalName) => {
    return modalName.filter((name) => !!modal[name]).map((name) => modal[name]);
  }
);

export const selectSubMenu = createSelector(
  [selectMenu, selectMenuName, selectEnteredStroe],
  (menuList, navMenuName, storeId) => {
    const menu = menuList?.find((item) => item.name === navMenuName);

    if (!menu) {
      return;
    }

    return menu.subMenu.map(({ to, ...item }) => {
      return {
        ...item,
        originUrl: to,
        to:
          menu.name === 'store'
            ? ['/', menu.name, `/@${storeId}`, to].join('')
            : ['/', menu.name, to].join(''),
      };
    });
  }
);
