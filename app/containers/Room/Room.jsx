import React from 'react';
import { getRoom, getMyRooms } from '../../actions/rooms';
import { getBetsInRoom } from '../../actions/bets';
import { getGames } from '../../actions/games';
import { connect } from 'react-redux';

import { FormattedHTMLMessage, injectIntl } from 'react-intl';
import { changeMyState, removeMe } from '../../actions/rooms';

import BetsTable from '../../components/BetsTable/BetsTable.jsx';
import Button from '../../components/Button/Button.jsx';
import Spin from '../../components/Spin/Spin.jsx';
import './Room.scss';

const Room = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func,
        children: React.PropTypes.node,
        room: React.PropTypes.object,
        user: React.PropTypes.object
    },

    componentDidMount() {
        const {params, dispatch} = this.props;

        dispatch(getRoom(params));
        dispatch(getBetsInRoom(params.roomId));
    },

    componentWillReceiveProps(nextProps) {
        const {room} = this.props;

        if (nextProps.room && nextProps.room.users &&
            room && room.users &&
            nextProps.room.users.length < room.users.length
        ) {
            this.props.dispatch(getMyRooms());
        }
        if (nextProps.params.roomId !== this.props.params.roomId) {
            this.props.dispatch(getRoom(nextProps.params));
            this.props.dispatch(getBetsInRoom(nextProps.params.roomId));
        }
    },

    playForMoney() {
        this.props.dispatch(changeMyState({free: false, roomId: this.props.room._id}));
    },
    playForFree() {
        this.props.dispatch(changeMyState({free: true, roomId: this.props.room._id}));
    },
    removeMe() {
        this.props.dispatch(removeMe({roomId: this.props.room._id}));
    },

    render() {
        const {intl, room:
            {_id: roomId, name, owner, code, rules={}, chargeUsers=[], changingMe, removingMe},
        user, games} = this.props;

        const iAmFree = !chargeUsers.some(chargeUser => chargeUser === user.id);
        const tournamentStarted = games && games[0] && games[0].started || false;


        const iAmOwner = user.id === (!!owner && owner._id);

        if (!roomId) {
            return <Spin center />
        }

        return (
            <div className="room">
                <div className="room__header">
                    <h2 className="room__title">
                        {name}
                        {iAmOwner && <span className="room__code">{code}</span>}
                    </h2>
                </div>
                <div className="room__content">
                    <BetsTable />
                </div>
                <div className="room__footer">
                    <span>
                    {!rules.free &&
                        <FormattedHTMLMessage id="Room.overallBank" values={{
                            currency: rules.charge && rules.charge.currency,
                            value: `${(rules.charge && rules.charge.value || 0) * chargeUsers.length}`
                        }} />}
                    </span>
                    <div className="room__controls">
                        {!rules.free && iAmFree &&
                            <Button
                                flat
                                secondary
                                disabled={changingMe}
                                label={intl.formatMessage({id: 'Room.playForMoney'}, {changingMe})}
                                onTouchTap={this.playForMoney} />}
                        {!rules.free && !iAmFree &&
                            <Button
                                flat
                                secondary
                                disabled={changingMe}
                                label={intl.formatMessage({id: 'Room.playForFree'}, {changingMe})}
                                onTouchTap={this.playForFree} />}
                        <Button
                            flat
                            secondary
                            disabled={removingMe || tournamentStarted}
                            label={intl.formatMessage({id: 'Room.leaveRoom'}, {removingMe})}
                            onTouchTap={this.removeMe} />
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps({room, user, bets: {data, status}, games: {list: games}}) {
    return {room, user, bets: data, games};
}

export default connect(mapStateToProps)(injectIntl(Room));
