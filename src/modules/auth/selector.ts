import { createSelector } from 'reselect';
import { RootState } from '@modules';

/**
 * @description input selector
 * @param state
 */
const selectAuth = (state: RootState) => state.auth;
