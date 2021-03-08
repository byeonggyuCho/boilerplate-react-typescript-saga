import actions, {
  GET_STORE,
  GET_STORE_SUMMARY,
  GET_STORE_MEMBER,
  clearEnterStore,
  StoreDetailType,
  enterStore,
  getStore,
  getStoreSummary,
  getStoreMember,
} from './action';
import {
  createCustomReducer,
  reducerUtils,
  AsyncState,
  handleAsyncActions,
  handleAsyncActionsById,
} from '@utils/asyncUtils';

import { StoreSummaryType, StoreMemberType } from '@models/store';

export interface StateStore {
  storeList: AsyncState<StoreDetailType[] | null>;
  enteredStore: StoreDetailType | null;
  storeSummaryList: AsyncState<StoreSummaryType[] | null>;
  storeMember: {
    [storeId: number]: AsyncState<StoreMemberType[] | null>;
  };
}

export const initialState: StateStore = {
  storeList: reducerUtils.initial(null),
  enteredStore: null,
  storeSummaryList: reducerUtils.initial(null),
  storeMember: {},
};

const store = createCustomReducer(initialState, actions)
  .handleAction(clearEnterStore, (state, action) => ({
    ...state,
    enteredStore: initialState.enteredStore,
  }))
  .handleAction(enterStore, (state, { payload }) => ({
    ...state,
    enteredStore: payload,
  }))
  // .handleAction(enterStoreReflesh.request, (state, action) =>
  //   handleAsyncActions(ENTER_STROE_REFLESH, 'enteredStore')(state, action)
  // )
  // .handleAction(enterStoreReflesh.success, (state, action) =>
  //   handleAsyncActions(ENTER_STROE_REFLESH, 'enteredStore')(state, action)
  // )
  // .handleAction(enterStoreReflesh.failure, (state, action) =>
  //   handleAsyncActions(ENTER_STROE_REFLESH, 'enteredStore')(state, action)
  // )
  .handleAction(getStore.request, (state, action) =>
    handleAsyncActions(GET_STORE, 'storeList')(state, action)
  )
  .handleAction(getStore.success, (state, action) =>
    handleAsyncActions(GET_STORE, 'storeList')(state, action)
  )
  .handleAction(getStore.failure, (state, action) =>
    handleAsyncActions(GET_STORE, 'storeList')(state, action)
  )
  .handleAction(getStoreSummary.success, (state, action) =>
    handleAsyncActions(GET_STORE_SUMMARY, 'storeSummaryList')(state, {
      ...action,
      // payload: action.payload.filter(
      //   (item) => state.enteredStore?.storeId !== item.storeId
      // ),
    })
  )
  .handleAction(getStoreSummary.request, (state, action) =>
    handleAsyncActions(GET_STORE_SUMMARY, 'storeSummaryList')(state, action)
  )
  .handleAction(getStoreSummary.failure, (state, action) =>
    handleAsyncActions(GET_STORE_SUMMARY, 'storeSummaryList')(state, action)
  )
  .handleAction(getStoreMember.request, (state, action) =>
    handleAsyncActionsById(GET_STORE_MEMBER, 'storeMember')(state, action)
  )
  .handleAction(getStoreMember.success, (state, action) =>
    handleAsyncActionsById(GET_STORE_MEMBER, 'storeMember')(state, action)
  )
  .handleAction(getStoreMember.failure, (state, action) =>
    handleAsyncActionsById(GET_STORE_MEMBER, 'storeMember')(state, action)
  );
export default store;
