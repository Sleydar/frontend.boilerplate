/**
 * Gets the data used in application
 */

import { put, call, all, takeLatest } from 'redux-saga/effects';
import { loadDataAsync } from './api';
import { LOAD_DATA } from './constants';
import { dataLoaded, dataLoadingError } from './actions';

export function* loadData() {
    try {
        const response = yield call(loadDataAsync);
        yield put(dataLoaded(response.data));
    } catch (error) {
        yield put(dataLoadingError(error));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appRootSaga() {
    // Watches for LOAD_DATA actions and calls loadData API methos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield all([takeLatest(LOAD_DATA, loadData)]);
}
