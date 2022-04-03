/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo } from 'react';

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import { CombinedState } from './interface';
import rootReducer from './rootReducer';

function initStore(initialState: CombinedState) {
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? compose(applyMiddleware(thunkMiddleware))
            : composeWithDevTools(applyMiddleware(thunkMiddleware, logger));

    return createStore(rootReducer, initialState, enhancer);
}

let store: any;

export const initializeStore = (preloadedState: CombinedState) => {
    let _store = store ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState: CombinedState) {
    const _store = useMemo(() => initializeStore(initialState), [initialState]);
    return _store;
}
