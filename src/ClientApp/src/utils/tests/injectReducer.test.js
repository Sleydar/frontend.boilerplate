/**
 * Test injectors
 */

import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render } from 'react-testing-library';

import configureStore from '../../configureStore';
import injectReducer, { useInjectReducer } from '../injectReducer';
import * as reducerInjectors from '../reducerInjectors';

// Fixtures
const Component = () => null;

const reducer = s => s;

describe('injectReducer decorator', () => {
    let store;
    let injectors;
    let ComponentWithReducer;

    beforeAll(() => {
        reducerInjectors.default = jest
            .fn()
            .mockImplementation(() => injectors);
    });

    beforeEach(() => {
        store = configureStore({}, createBrowserHistory());
        injectors = {
            injectReducer: jest.fn(),
        };
        ComponentWithReducer = injectReducer({ key: 'test', reducer })(
            Component,
        );
        reducerInjectors.default.mockClear();
    });

    it('should inject a given reducer', () => {
        renderer.create(
            <Provider store={store}>
                <ComponentWithReducer />
            </Provider>,
        );

        expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
        expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
    });

    it('should set a correct display name', () => {
        expect(ComponentWithReducer.displayName).toBe('withReducer(Component)');
        expect(
            injectReducer({ key: 'test', reducer })(() => null).displayName,
        ).toBe('withReducer(Component)');
    });
});

describe('useInjectReducer hook', () => {
    let store;
    let injectors;
    let ComponentWithReducer;

    beforeAll(() => {
        injectors = {
            injectReducer: jest.fn(),
        };
        reducerInjectors.default = jest
            .fn()
            .mockImplementation(() => injectors);
        store = configureStore({}, createBrowserHistory());
        ComponentWithReducer = () => {
            useInjectReducer({ key: 'test', reducer });
            return null;
        };
    });

    it('should inject a given reducer', () => {
        render(
            <Provider store={store}>
                <ComponentWithReducer />
            </Provider>,
        );

        expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
        expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
    });
});
