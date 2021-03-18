import actions, { START_LOADING, FINISH_LOADING } from './action';
import { createReducer, ActionType } from 'typesafe-actions';

interface StateLoding {
  [props: string]: boolean;
  allFinished: boolean;
}

type Actions = ActionType<typeof actions>;

export const initialState: StateLoding = {
  allFinished: true,
};

// 예외 케이스

const loading = createReducer<StateLoding, Actions>(initialState, {});

export default loading;
