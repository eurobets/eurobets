import b from 'b_';
import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash'

import { manualLogin, signUp, clearMessage } from 'actions/users';
import Button from '../../components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';

import './Register.scss';

const Register = React.createClass({
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
            name: null,
            lastName: null,
            email: null,
            password: null
        }
    },

    componentWillUnmount() {
        this.props.dispatch(clearMessage());
    },

    onRegisterSubmit(e) {
        e.preventDefault();

        const { dispatch } = this.props;
        const { name, lastName, email, password } = this.state;

        dispatch(signUp({email, password, name, lastName}));
    },

    render() {
        const {intl: {formatMessage}, user: {message}} = this.props;
        const nameError = _.get(message, ['profile.name', 'kind']);
        const lastNameError = _.get(message, ['profile.lastName', 'kind']);
        const emailError = _.get(message, ['email', 'kind']);
        const passwordError = _.get(message, ['password', 'kind']);

        return (
            <div className="register">
                <h1 className='register__title'>{formatMessage({id: 'Register.title'})}</h1>
                <div className='register__description'>{formatMessage({id: 'Register.description'})}</div>
                <form className="register__form" onSubmit={this.onRegisterSubmit}>
                    <Input
                        errorText={nameError && formatMessage({id: `Register.${nameError}`})}
                        mix='register__input'
                        onChange={e => this.setState({name: e.target.value})}
                        hintText={formatMessage({id: 'Register.name'})} />
                    <Input
                        errorText={lastNameError && formatMessage({id: `Register.${lastNameError}`})}
                        mix='register__input'
                        onChange={e => this.setState({lastName: e.target.value})}
                        hintText={formatMessage({id: 'Register.lastName'})} />
                    <Input
                        errorText={emailError && formatMessage({id: `Register.${emailError}`})}
                        mix='register__input'
                        type="email"
                        onChange={e => this.setState({email: e.target.value})}
                        hintText="Email" />
                    <Input
                        errorText={passwordError && formatMessage({id: `Register.${passwordError}`})}
                        mix='register__input'
                        type="password"
                        onChange={e => this.setState({password: e.target.value})}
                        hintText={formatMessage({id: 'Register.password'})} />
                    {!!message && message.length > 0 &&
                        <div className="register__message">
                            {formatMessage({id: `Register.${message}`})}
                        </div>}
                    <div className="register__controls">
                        <Button
                            type="submit"
                            primary
                            mix="login-form__button"
                            label={formatMessage({id: 'Register.toRegister'})} />
                    </div>
                </form>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps)(injectIntl(Register));

