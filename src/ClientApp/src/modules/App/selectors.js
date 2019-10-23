/*
 * App Selectors
 *
 * Selectors are used to select the specific part from the state
 *
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppRoot = state => state || { initialState };

const makeSelectData = () =>
    createSelector(
        selectAppRoot,
        rootState => rootState.global.data,
    );
export { makeSelectData };
