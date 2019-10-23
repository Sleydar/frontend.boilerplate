/**
 * Test injectors
 */

import produce from 'immer';
import { createBrowserHistory } from 'history';

import configureStore from '../../configureStore';

import getInjectors, { injectReducerFactory } from '../reducerInjectors';

// Fixtures

const initialState = { reduced: 'soon' };

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case 'TEST':
                draft.reduced = action.payload;
                break;
        }
    });

describe('reducer injectors', () => {
    let store;
    let injectReducer;

    describe('getInjectors', () => {
        beforeEach(() => {
            const history = createBrowserHistory();
            store = configureStore({}, history);
        });

        it('should return injectors', () => {
            expect(getInjectors(store)).toEqual(
                expect.objectContaining({
                    injectReducer: expect.any(Function),
                }),
            );
        });

        it('should throw if passed invalid store shape', () => {
            Reflect.deleteProperty(store, 'dispatch');

            expect(() => getInjectors(store)).toThrow();
        });
    });

    describe('injectReducer helper', () => {
        beforeEach(() => {
            const history = createBrowserHistory();
            store = configureStore({}, history);
            injectReducer = injectReducerFactory(store, true);
        });

        it('should check a store if the second argument is falsy', () => {
            const inject = injectReducerFactory({});

            expect(() => inject('test', reducer)).toThrow();
        });

        it("should validate a reducer and reducer's key", () => {
            expect(() => injectReducer('', reducer)).toThrow();
            expect(() => injectReducer(1, reducer)).toThrow();
            expect(() => injectReducer(1, 1)).toThrow();
        });
    });
});
