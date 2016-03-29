import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';


import { logOut } from 'actions/users';

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
            avatarElement: null,
            menuShown: false,
            showLoginForm: false
        };
    },

    componentDidMount() {
        this.setState({avatarElement: this.refs.avatar});
    },

    onLogout(e) {
        e.preventDefault();
        this.setState({menuShown: false});
        this.props.dispatch(logOut()).then(() => this.context.router.push('/'));
    },

    openMenu(e) {
        e.preventDefault();

        this.setState({menuShown: true})
    },

    render() {
        const {user: {authenticated, email, profile: {name, lastName}}, intl} = this.props;
        const initials = name || lastName
            ? `${name.substr(0, 1) || ''}${lastName.substr(0, 1) || ''}`
            :  email.substr(0, 1);
        const itemStyle = {padding: '0 12px'};

        // <Link onClick={this.onLogout} mix="user__logout" theme="light" to="/">
        //     {intl.formatMessage({id: 'User.logout'})}
        // </Link>

        return authenticated && (
            <div className="user">
                <a className="user__avatar" href="#" onClick={this.openMenu} ref="avatar">
                    {initials}
                </a>
                <Popover
                    anchorEl={this.state.avatarElement}
                    animation={PopoverAnimationFromTop}
                    onRequestClose={() => this.setState({menuShown: false})}
                    open={this.state.menuShown}>
                        <Menu desktop className="user__menu" onChange={this.onMenuChange}>
                            <MenuItem
                                value="profile" disabled primaryText={intl.formatMessage({id: 'User.profile'})} />
                            <MenuItem
                                value="logout"
                                onTouchTap={this.onLogout}
                                onClick={this.onLogout}
                                primaryText={intl.formatMessage({id: 'User.logout'})} />
                        </Menu>
                </Popover>
            </div>
        );
    }
});

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps)(injectIntl(User));
