import React, { Component, PropTypes } from 'react';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';

import Header from 'components/Header/Header';
import LoginForm from 'components/LoginForm/LoginForm';
import Logo from 'components/Logo/Logo';

import './Main.scss';

const Main = React.createClass({
    render() {
        return (
            <div className="main">
                <Logo theme="big" />
                <LoginForm />
            </div>
        );
    }
});

export default Main;

