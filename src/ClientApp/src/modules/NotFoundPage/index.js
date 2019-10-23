/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading, Element } from 'bootstrap/components';
import messages from './messages';

export default function NotFound() {
    return (
        <article>
            <Heading size="1">
                <Element tag="h2" className="u-upperCase u-marginNo">
                    <FormattedMessage {...messages.header} />
                </Element>
            </Heading>
            ;
        </article>
    );
}
