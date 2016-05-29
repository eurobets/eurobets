import React from 'react';
import {FormattedHTMLMessage, injectIntl} from 'react-intl';
import { connect } from 'react-redux';

import Button from '../../components/Button/Button.jsx';
import Games from '../../components/Games/Games.jsx';

import { changeMyState, removeMe } from '../../actions/rooms';

import './RoomMain.scss';

const RoomMain = React.createClass({
    propTypes: {
        intl: React.PropTypes.object,
        room: React.PropTypes.object,
        user: React.PropTypes.object,
        meInRoom: React.PropTypes.object
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
        const {intl, room: {rules, users, chargeUsers=[], changingMe, removingMe}, user, games} = this.props;
        const players = users.length;
        const iAmFree = !chargeUsers.some(chargeUser => chargeUser === user.id);
        const tournamentStarted = games && games[0] && games[0].started || false;

        return (
            <div className="room-main">
                <div>
                    <FormattedHTMLMessage id="RoomMain.overallPlayers" values={{players: `${players}`}} />
                </div>
                {!rules.free &&
                    <div>
                        <FormattedHTMLMessage id="RoomMain.overallBank" values={{
                            currency: rules.charge.currency,
                            value: `${(rules.charge.value || 0) * chargeUsers.length}`
                        }} />
                    </div>}
                <Games />
                <div className="room-main__controls">
                    <Button
                        disabled={removingMe || tournamentStarted}
                        label={intl.formatMessage({id: 'RoomMain.leaveRoom'}, {removingMe})}
                        primary
                        onTouchTap={this.removeMe} />
                    {!rules.free && iAmFree &&
                        <Button
                            disabled={changingMe}
                            label={intl.formatMessage({id: 'RoomMain.playForMoney'}, {changingMe})}
                            primary
                            onTouchTap={this.playForMoney} />}
                    {!rules.free && !iAmFree &&
                        <Button
                            disabled={changingMe}
                            label={intl.formatMessage({id: 'RoomMain.playForFree'}, {changingMe})}
                            primary
                            onTouchTap={this.playForFree} />}

                </div>
            </div>
        );
    }
});


function mapStateToProps({room, user, games: {list}}) {
    return {room, user, games: list};
}

export default connect(mapStateToProps)(injectIntl(RoomMain));
