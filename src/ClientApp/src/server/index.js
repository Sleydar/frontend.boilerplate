import React from 'react';
import { createServerRenderer } from 'aspnet-prerendering';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import LanguageProvider from '../modules/App/components/Footer/components/LanguageProvider';

import App from '../modules/App';
import configureStore from '../configureStore';

const renderer = createServerRenderer(
    params =>
        new Promise(resolve => {
            const context = {};
            const initialState = {};
            const history = createMemoryHistory();

            const store = configureStore(params.data || initialState, history);

            if (context.url) {
                // Somewhere a `<Redirect>` was rendered
                return resolve({ redirectUrl: context.url });
            }

            if (context.status) {
                return resolve({
                    statusCode: context.status,
                });
            }

            const renderApp = messages => (
                <Provider store={store}>
                    <LanguageProvider messages={messages}>
                        <ConnectedRouter history={history}>
                            <App />
                        </ConnectedRouter>
                    </LanguageProvider>
                </Provider>
            );

            const html = renderToString(renderApp({}));

            return resolve({
                html: `<div id="boilerplate-app">${html}</div>`,
                globals: {
                    // eslint-disable-next-line no-undef
                    links: [`${PUBLIC_URL}main.css`],
                    // eslint-disable-next-line no-undef
                    scripts: [`${PUBLIC_URL}main.js`],
                    data: store.getState(),
                },
            });
        }),
);

export { renderer };
export default renderer;
