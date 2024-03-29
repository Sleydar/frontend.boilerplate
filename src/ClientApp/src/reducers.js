/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import globalReducer from './modules/App/reducer';
import languageProviderReducer from './modules/App/components/Footer/components/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}, history) {
    const rootReducer = combineReducers({
        global: globalReducer,
        language: languageProviderReducer,
        router: connectRouter(history),
        ...injectedReducers,
    });

    return rootReducer;
}
