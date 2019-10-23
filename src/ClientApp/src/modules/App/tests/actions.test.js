import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_ERROR } from '../constants';

import { loadData, dataLoaded, dataLoadingError } from '../actions';

describe('App Actions', () => {
    describe('loadData', () => {
        it('should return the correct type', () => {
            const expectedResult = {
                type: LOAD_DATA,
            };

            expect(loadData()).toEqual(expectedResult);
        });
    });

    describe('dataLoaded', () => {
        it('should return the correct type and data', () => {
            const fixture = ['Test'];
            const expectedResult = {
                type: LOAD_DATA_SUCCESS,
                data: fixture,
            };

            expect(dataLoaded(fixture)).toEqual(expectedResult);
        });
    });

    describe('dataLoadingError', () => {
        it('should return the correct type and the error', () => {
            const fixture = {
                msg: 'Something went wrong!',
            };
            const expectedResult = {
                type: LOAD_DATA_ERROR,
                error: fixture,
            };

            expect(dataLoadingError(fixture)).toEqual(expectedResult);
        });
    });
});
