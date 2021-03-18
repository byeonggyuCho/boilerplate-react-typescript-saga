import { createSelector } from 'reselect';
import { RootState } from '@modules';

const selectMenuName = (
  state: RootState,
  navMenuName: 'admin' | 'store' | 'payment'
) => navMenuName;

const selectMenu = (state: RootState) => state.base.menuList;

const selectByModalName = (state: RootState, modalName: string[]) => modalName;

``;
