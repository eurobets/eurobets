import b from 'b_';
import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { logOut } from 'actions/users';

import './Navigation.scss';

const Navigation = React.createClass({
    propTypes: {
        intl: React.PropTypes.object.isRequired,
        user: React.PropTypes.object,
        dispatch: React.PropTypes.func.isRequired
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render() {
        const {user, dispatch, intl} = this.props;
        const {router} = this.context;

        return (
            <nav className="navigation" role="navigation">
                <Link
                    to="/"
                    className={b('navigation', 'item', {logo: true})}
                    activeClassName={b('navigation', 'item', {logo: true, active: true})}>Eurobets</Link>
                {user.authenticated
                    ? <Link
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(logOut()).then(() => router.push('/'));
                        }}
                        className="navigation__item"
                        to="/">
                            {intl.formatMessage({id: 'Navigation.logout'})}
                    </Link>
                    : <Link
                        className="navigation__item"
                        to="/">
                            {intl.formatMessage({id: 'Navigation.login'})}
                    </Link>}
            </nav>
        );
    }
});

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps)(injectIntl(Navigation));
