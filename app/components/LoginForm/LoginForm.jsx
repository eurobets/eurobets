import b from 'b_';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';

import { manualLogin, signUp, clearMessage } from 'actions/users';

import Button from '../Button/Button';
import Input from '../Input/Input';
import Link from '../Link/Link';

import './LoginForm.scss';

const UserLoginForm = React.createClass({
    propTypes: {
        intl: PropTypes.object,
        user: PropTypes.object,
        dispatch: PropTypes.func
    },

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            email: null,
            password: null
        };
    },


    componentWillUnmount() {
        this.props.dispatch(clearMessage());
    },

    onLoginSubmit(e) {
        e.preventDefault();

        const {dispatch} = this.props;
        const {email, password} = this.state;

        dispatch(manualLogin({email, password}));
    },

    render() {
        const {user: {message}, intl} = this.props;

        return (
            <form onSubmit={this.onLoginSubmit} className="login-form" action="/">
                <div className="login-form__content">
                    <Input
                        mix="login-form__input"
                        type="email"
                        onChange={e => this.setState({email: e.target.value})}
                        placeholder="Email" />
                    <Input
                        mix="login-form__input"
                        type="password"
                        onChange={e => this.setState({password: e.target.value})}
                        placeholder={intl.formatMessage({id: 'LoginForm.password'})} />
                    {!!message && message.length > 0 &&
                        <div className="login-form__message">
                            {intl.formatMessage({id: `LoginForm.${message}`})}
                        </div>}
                </div>
                <div className="login-form__controls">
                    <Button
                        type="submit"
                        fullWidth
                        primary
                        mix="login-form__button"
                        label={intl.formatMessage({id: 'LoginForm.login'})} />
                </div>
                <div className="login-form__footer">
                    <a className="login-form__google-link" href="/auth/google">
                        {intl.formatMessage({id: 'LoginForm.loginWithGoogle'})}
                    </a>
                    <Link mix="login-form__register-link" to="/register">
                        {intl.formatMessage({id: 'LoginForm.register'})}
                    </Link>
                </div>
            </form>
        );
    }
});

function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps)(injectIntl(UserLoginForm));

