import React from 'react';
import { injectIntl } from 'react-intl';
import Link from 'components/Link/Link';
import { connect } from 'react-redux';

import Avatar from 'material-ui/lib/avatar';

import { logOut } from 'actions/users';

import LoginForm from '../LoginForm/LoginForm';

import './User.scss';

const User = React.createClass({
    propTypes: {
        intl: React.PropTypes.object.isRequired,
        user: React.PropTypes.object,
        dispatch: React.PropTypes.func.isRequired
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            showLoginForm: false
        };
    },

    onLogout(e) {
        e.preventDefault();
        this.props.dispatch(logOut()).then(() => this.context.router.push('/'));
    },

    render() {
        const {user, intl} = this.props;
        console.log(user);
        return user.authenticated && (
            <div className="user">
                <Link onClick={this.onLogout} mix="user__logout" theme="light" to="/">
                    {intl.formatMessage({id: 'User.logout'})}
                </Link>
            </div>
        );
    }
});

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps)(injectIntl(User));
