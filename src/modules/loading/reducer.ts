import actions, { START_LOADING, FINISH_LOADING } from './action';
import { createReducer, ActionType } from 'typesafe-actions';
import { SORT_CATEGORY } from '@modules/category/action';
import { SORTING_CHECKLIST } from '@modules/checklist/action';

import {
  GET_BRAND_STORE_BY_ID,
  GET_MEMBER_COUNT_BY_STORE_ID,
  GET_AVERAGE_PERFORMANCE,
  GET_HOURLY_STATISTICS,
  GET_BEST_CHECKLIST,
  GET_BEST_STORE,
  GET_STORE_MEMBER,
  GET_WORK_PERIOD,
  GET_TOTAL_PERFORMANCE_BY_STORE_ID,
  GET_WORK_PERIOD_BY_STORE_ID,
  GET_DAILY_PERFORMANCE_BY_STORE_ID,
  GET_WEEKLY_PERFORMANCE_BY_STORE_ID,
  GET_MONTHLY_PERFORMANCE_BY_STORE_ID,
  GET_HOURLY_PERFORMANCE_BY_STORE_ID,
  GET_BEST_CHECKLIST_BY_STORE_ID,
  GET_BRAND_STORE,
  GET_BRAND_AUTO_COMPLETE,
  GET_BRAND_STORE_COUNT,
} from '@modules/brand/action';
interface StateLoding {
  [props: string]: boolean;
  allFinished: boolean;
}

type Actions = ActionType<typeof actions>;

export const initialState: StateLoding = {
  allFinished: true,
};

// 예외 케이스
const isExcept = (actionType: string) =>
  [
    'allFinished',
    SORT_CATEGORY.REQUEST,
    SORTING_CHECKLIST.REQUEST,
    GET_BRAND_STORE_BY_ID.REQUEST,
    GET_MEMBER_COUNT_BY_STORE_ID.REQUEST,
    GET_AVERAGE_PERFORMANCE.REQUEST,
    GET_HOURLY_STATISTICS.REQUEST,
    GET_BEST_CHECKLIST.REQUEST,
    GET_BEST_STORE.REQUEST,
    GET_STORE_MEMBER.REQUEST,
    GET_WORK_PERIOD.REQUEST,
    GET_TOTAL_PERFORMANCE_BY_STORE_ID.REQUEST,
    GET_WORK_PERIOD_BY_STORE_ID.REQUEST,
    GET_DAILY_PERFORMANCE_BY_STORE_ID.REQUEST,
    GET_WEEKLY_PERFORMANCE_BY_STORE_ID.REQUEST,
    GET_MONTHLY_PERFORMANCE_BY_STORE_ID.REQUEST,
    GET_HOURLY_PERFORMANCE_BY_STORE_ID.REQUEST,
    GET_BEST_CHECKLIST_BY_STORE_ID.REQUEST,
    GET_BRAND_STORE.REQUEST,
    GET_BRAND_AUTO_COMPLETE.REQUEST,
    GET_BRAND_STORE_COUNT.REQUEST,
  ].includes(actionType);

const loading = createReducer<StateLoding, Actions>(initialState, {
  [START_LOADING]: (state, { payload: type }) => {
    if (isExcept(type)) {
      return {
        ...state,
      };
    }

    return {
      ...state,
      allFinished: false,
      [type]: true,
    };
  },
  [FINISH_LOADING]: (state, { payload: type }) => {
    return {
      ...state,
      [type]: false,
      allFinished: Object.entries(state).every(([actionType, isLoading]) => {
        if (!isExcept(actionType)) {
          return actionType === type ? true : !isLoading;
        } else {
          return true;
        }
      }),
    };
  },
});

export default loading;
