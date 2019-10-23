/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Collapse } from 'bootstrap/components';

import { makeSelectData } from '../App/selectors';

export function HomePage({ data }) {
    return (
        <article>
            <Helmet>
                <title>Frontend.Boilerplate home page</title>
                <meta
                    name="description"
                    content="Frontend.Boilerplate home page"
                />
            </Helmet>
            <div>
                {data &&
                    data.map(element => (
                        <Collapse title={element.name} id={element.name}>
                            <p>{element.species}</p>
                        </Collapse>
                    ))}
            </div>
        </article>
    );
}

HomePage.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            species: PropTypes.string.isRequired,
        }),
    ),
};

const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
});

export function mapDispatchToProps() {
    return {};
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(HomePage);
