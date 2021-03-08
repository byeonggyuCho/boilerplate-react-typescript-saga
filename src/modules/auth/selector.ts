import { createSelector } from 'reselect';
import { RootState } from '@modules';
import { StateAuth } from './reducer';
import { Authority } from '@models/auth';

/**
 * @description input selector
 * @param state
 */
const selectAuth = (state: RootState) => state.auth;

/**
 * @description output selector
 * input selector를 여러개 지정할 수 있다. output selector는 input selector를 참조한다.
 * output selelctor도 다른 output selector의 input selector로 사용 가능하다.
 */
export const getUserRole = createSelector(
  [selectAuth],
  ({ auth }: StateAuth): Authority => {
    const isAdmin = auth.data?.brandManager;

    if (auth.data) {
      return isAdmin ? 'ADMIN' : 'OWNER';
    }

    return 'GUEST';
  }
);
