import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Header, Arrange, Button } from 'bootstrap/components';
import messages from './messages';

function HeaderComponent() {
    return (
        <Header>
            <Arrange>
                <Arrange.Item direction="1">
                    <Button variant="link">
                        <Link to="/">
                            <FormattedMessage {...messages.home} />
                        </Link>
                    </Button>
                </Arrange.Item>
                <Arrange.Item direction="2">
                    <Button variant="link">
                        <Link to="/features">
                            <FormattedMessage {...messages.features} />
                        </Link>
                    </Button>
                </Arrange.Item>
                <Arrange.Item direction="3">
                    <Button>Log In</Button>
                </Arrange.Item>
            </Arrange>
        </Header>
    );
}

export default HeaderComponent;
