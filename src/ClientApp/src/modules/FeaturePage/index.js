/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { Heading, Element, Container } from 'bootstrap/components';
import messages from './messages';

export default function FeaturePage() {
    return (
        <div>
            <Helmet>
                <title>Feature Page</title>
                <meta
                    name="description"
                    content="Feature page of React.js Boilerplate application"
                />
            </Helmet>
            <Heading size="1">
                <Element tag="h1" className="u-upperCase u-marginNo">
                    <FormattedMessage {...messages.header} />
                </Element>
            </Heading>
            <Container>
                <Element tag="h3" className="u-upperCase u-marginNo">
                    <FormattedMessage {...messages.scaffoldingHeader} />
                </Element>
                <p>
                    <FormattedMessage {...messages.scaffoldingMessage} />
                </p>
            </Container>

            <Container>
                <Element tag="h3" className="u-upperCase u-marginNo">
                    <FormattedMessage {...messages.feedbackHeader} />
                </Element>
                <p>
                    <FormattedMessage {...messages.feedbackMessage} />
                </p>
            </Container>

            <Container>
                <Element tag="h3" className="u-upperCase u-marginNo">
                    <FormattedMessage {...messages.routingHeader} />
                </Element>
                <p>
                    <FormattedMessage {...messages.routingMessage} />
                </p>
            </Container>

            <Container>
                <Element tag="h3" className="u-upperCase u-marginNo">
                    <FormattedMessage {...messages.networkHeader} />
                </Element>
                <p>
                    <FormattedMessage {...messages.networkMessage} />
                </p>
            </Container>

            <Container>
                <Element tag="h3" className="u-upperCase u-marginNo">
                    <FormattedMessage {...messages.intlHeader} />
                </Element>
                <p>
                    <FormattedMessage {...messages.intlMessage} />
                </p>
            </Container>
        </div>
    );
}
