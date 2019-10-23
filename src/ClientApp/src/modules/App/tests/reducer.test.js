import produce from 'immer';

import appReducer from '../reducer';
import { loadData, dataLoaded, dataLoadingError } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
    let state;
    beforeEach(() => {
        state = {
            loading: false,
            error: false,
            data: [],
        };
    });

    it('should return the initial state', () => {
        const expectedResult = state;
        expect(appReducer(undefined, {})).toEqual(expectedResult);
    });

    it('should handle the loadData action correctly', () => {
        const expectedResult = produce(state, draft => {
            draft.loading = true;
            draft.error = false;
            draft.data = [];
        });

        expect(appReducer(state, loadData())).toEqual(expectedResult);
    });

    it('should handle the dataLoaded action correctly', () => {
        const fixture = [
            {
                name: 'Data 1',
            },
        ];

        const expectedResult = produce(state, draft => {
            draft.data = fixture;
            draft.loading = false;
        });

        expect(appReducer(state, dataLoaded(fixture))).toEqual(expectedResult);
    });

    it('should handle the repoLoadingError action correctly', () => {
        const fixture = {
            msg: 'Not found',
        };
        const expectedResult = produce(state, draft => {
            draft.error = fixture;
            draft.loading = false;
        });

        expect(appReducer(state, dataLoadingError(fixture))).toEqual(
            expectedResult,
        );
    });
});
