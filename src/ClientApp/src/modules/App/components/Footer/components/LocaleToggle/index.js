/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Select } from 'bootstrap/components';

import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';

const appLocalesSelect = [
    {
        label: 'English',
        value: 'en',
        key: 'en',
    },
    {
        label: 'Deutsche',
        value: 'de',
        key: 'de',
    },
];

export function LocaleToggle(props) {
    return (
        <Select
            name="localeToggle"
            value={props.locale}
            onChange={props.onLocaleToggle}
            options={appLocalesSelect}
        />
    );
}

LocaleToggle.propTypes = {
    onLocaleToggle: PropTypes.func,
    locale: PropTypes.string,
};

const mapStateToProps = createSelector(
    makeSelectLocale(),
    locale => ({
        locale,
    }),
);

export function mapDispatchToProps(dispatch) {
    return {
        onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
        dispatch,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LocaleToggle);
