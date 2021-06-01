import b from 'b_';
import React from 'react';
import { connect } from 'react-redux';

import Link from 'components/Link/Link';
import Logo from 'components/Logo/Logo';
import User from 'components/User/User';

import './Header.scss';

const Header = React.createClass({
    render() {
        return (
            <div className="header">
                <div className="header__logo-wrapper">
                    <Link to="/" mix="header__logo" theme="light">
                        <Logo />
                    </Link>
                </div>
                {this.props.user.authenticated && <User />}
            </div>
        );
    }
});


function mapStateToProps({user}) {
    return {user};
}
export default connect(mapStateToProps)(Header);
