import { createSelector } from 'reselect';
import { RootState } from '@modules';

/**
 * @description input Selector
 * @param {RootState} state
 */
const selectStore = (state: RootState) => state.store.storeList;

const selectAuth = (state: RootState) => state.auth.auth.data;

const selecStoreMember = (state: RootState) => state.store.storeMember;

const selectStoreSummaryList = (state: RootState) =>
  state.store.storeSummaryList.data;

const selectByStoreId = (state: RootState, storeId: number) => storeId;

/**
 * @description 특정 매장의 총 업무 수를 반환합니다.
 */
export const getAllChecklistCount = createSelector(
  [selectStoreSummaryList, selectByStoreId],
  (storeSummaryList, storeId) => {
    if (storeSummaryList) {
      const that = storeSummaryList.find(
        (item) => `${item.storeId}` === `${storeId}`
      );
      if (!that?.checklistCount) {
      }

      return that?.checklistCount;
    }
  }
);

/**
 * @description output selector
 * input selector를 여러개 지정할 수 있다. output selector는 input selector를 참조한다.
 * output selelctor도 다른 output selector의 input selector로 사용 가능하다.
 */
export const getStoreList = createSelector([selectStore], (storeList) => {
  // 상태 연산.
  if (storeList.data) {
    return storeList.data.map((item, index) => ({
      ...item,
      no: index + 1,
    }));
  }

  return null;
});

/**
 * @descriptoin
 */
export const selectEmployee = createSelector(
  [selecStoreMember, selectAuth, selectByStoreId],
  (storeMember, auth, storeId) => {
    return storeMember[storeId]?.data?.filter(
      (item) => item.userId !== auth?.user.userId
    );
  }
);
