import React from 'react';
import {FormattedHTMLMessage, injectIntl} from 'react-intl';

import './RoomMain.scss';

const RoomMain = React.createClass({
    propTypes: {
        intl: React.PropTypes.object,
        room: React.PropTypes.object,
        user: React.PropTypes.object,
        meInRoom: React.PropTypes.object
    },

    playForMoney(e) {
        e.preventDefault();
    },

    render() {
        const {intl, meInRoom, room: {rules, users}} = this.props;
        const players = users.length;
        const chargePlayers = users.filter(({charge}) => charge).length;
        const iAmFree = meInRoom.charge === false;

        return (
            <div className="room-main">
                <div>
                    <FormattedHTMLMessage id="RoomMain.overallPlayers" values={{players: `${players}`}} />
                </div>
                {!rules.free &&
                    <div>
                        <FormattedHTMLMessage id="RoomMain.overallBank" values={{
                            currency: rules.charge.currency,
                            value: `${(rules.charge.value || 0) * chargePlayers}`
                        }} />
                        {!iAmFree &&
                            <div>
                                <FormattedHTMLMessage id="RoomMain.iAmFree" />
                                <a href="#" onClick={this.playForMoney}>
                                    {intl.formatMessage({id: 'RoomMain.playForMoney'})}
                                </a>
                            </div>}
                    </div>}

            </div>
        );
    }
});

export default injectIntl(RoomMain);
