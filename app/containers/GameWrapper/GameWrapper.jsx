import b from 'b_';
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';
import Link from '../../components/Link/Link.jsx';
import Spin from '../../components/Spin/Spin.jsx';
import Menu from '../../components/Menu/Menu.jsx';
import Input from '../../components/Input/Input.jsx';

import { getGames } from '../../actions/games';
import { getMyRooms, insertUserByCode } from '../../actions/rooms';

import './GameWrapper.scss';

const GameWrapper = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            adding: false,
            code: ''
        }
    },

    componentDidMount() {
        this.props.dispatch(getMyRooms());
        this.props.dispatch(getGames());

        this.context.router.listen(this.setInitialState)
    },

    componentWillReceiveProps({rooms: nextRooms=[]}) {
        const {rooms=[]} = this.props;

        if (rooms.length !== nextRooms.length) {
            this.setState(this.getInitialState());
        }
    },

    componentWillUnmount() {
        this.context.router.unregisterTransitionHook(this.setInitialState)
    },


    setInitialState() {
        this.setState(this.getInitialState());
    },

    onInputChange({target: {value}}) {
        this.setState({code: value});
        if (value.length === 9) {
            this.props.dispatch(insertUserByCode(value));
        }
    },

    render() {
        const {rooms, intl, loading, message} = this.props;

        if (!rooms) {
            return <Spin center />;
        }

        let {adding, code} = this.state;
        const codeError = _.get(message, ['code', 'kind']);
        const norooms = rooms.length === 0;
        adding = adding || norooms;
        const isDashboard = this.context.router.isActive('dashboard');

        return (
            <div className="game-wrapper">
                {!norooms && <div className="game-wrapper__header">
                    <Link
                        mix={b('game-wrapper', 'to-dashboard', {active: isDashboard})}
                        to="/dashboard"></Link>
                    <Menu items={rooms.map(({_id: id, name}) => ({to: `/rooms/${id}/`, name}))} />
                    {!adding && isDashboard && <Link
                        pseudo
                        mix="game-wrapper__add-room-control"
                        onClick={() => this.setState({adding: true})}>+</Link>}
                </div>}
                {adding &&
                    <div className={b('game-wrapper', 'add-room', {norooms})}>
                        {!norooms &&
                            <div
                                className="game-wrapper__add-room-close"
                                onClick={() => this.setState({adding: false})} />}
                        {norooms && <h1><FormattedMessage id="GameWrapper.addFirstRoom" /></h1>}
                        {norooms && <div className="game-wrapper__add-room-description">
                            <FormattedHTMLMessage id="GameWrapper.addFirstRoomReason" />
                        </div>}
                        <Input
                            mix="game-wrapper__add-room-input"
                            value={code}
                            errorText={codeError && intl.formatMessage({id: `GameWrapper.${codeError}`})}
                            onChange={this.onInputChange}
                            hintStyle={{left: 0, right: 0}}
                            hintText={intl.formatMessage({id: 'GameWrapper.enterTheCode'})} />
                        <Link to="/create-room/" mix="game-wrapper__new-room">
                            <FormattedMessage id="GameWrapper.createRoom" />
                        </Link>
                    </div>}
                <div className="game-wrapper__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

function mapStateToProps({room: {rooms, loading, message}}) {
    return {rooms, loading, message};
}

export default connect(mapStateToProps)(injectIntl(GameWrapper));
