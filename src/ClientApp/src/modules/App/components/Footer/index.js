import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Footer } from 'bootstrap/components';
import LocaleToggle from './components/LocaleToggle';
import messages from './messages';

function FooterComponent() {
    return (
        <Footer style={{ position: 'sticky', bottom: '0' }}>
            <section>
                <FormattedMessage {...messages.licenseMessage} />
            </section>
            <section>
                <LocaleToggle />
            </section>
        </Footer>
    );
}

export default FooterComponent;
