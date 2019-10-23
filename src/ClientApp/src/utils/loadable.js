/*
 * loadable utility
 *
 * Used to lazy load modules on client.
 * As lazy and Suspense are not supported on server side it returns component if typeof window !== 'object'
 */

import React, { lazy, Suspense } from 'react';

const loadable = (
    importFunc,
    { fallback = null } = { fallback: null },
    Component,
) => {
    if (typeof window === 'object') {
        const LazyComponent = lazy(importFunc);

        return props => (
            <Suspense fallback={fallback}>
                <LazyComponent {...props} />
            </Suspense>
        );
    }
    return props => <Component {...props} />;
};

export default loadable;
