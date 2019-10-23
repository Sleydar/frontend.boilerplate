/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router';

import { compose } from 'redux';
import { Container } from 'bootstrap/components';
import HomePage from '../HomePage/Loadable';
import FeaturePage from '../FeaturePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import './index.scss';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';

const withSaga = injectSaga({ key: 'App', saga });

export function App() {
    return (
        <>
            <Helmet
                titleTemplate="%s - Frontend.Boilerplate"
                defaultTitle="Frontend.Boilerplate"
            >
                <meta
                    name="description"
                    content="A React Boilerplate application"
                />
            </Helmet>

            <HeaderComponent />
            <Container
                style={{ background: '#fff', padding: 48, minHeight: 280 }}
            >
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/features" component={FeaturePage} />
                    <Route path="" component={NotFoundPage} />
                </Switch>
            </Container>
            <FooterComponent />
        </>
    );
}

export default compose(withSaga)(App);
