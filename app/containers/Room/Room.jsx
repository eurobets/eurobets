import _ from 'lodash';
import b from 'b_';
import React from 'react';
import { getRoom, getMyRooms } from '../../actions/rooms';
import { getBetsInRoom } from '../../actions/bets';
import { connect } from 'react-redux';

import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Popover from 'material-ui/lib/popover/popover';

import { FormattedHTMLMessage, FormattedMessage, injectIntl } from 'react-intl';
import { changeMyState, removeMe, insertBot } from '../../actions/rooms';

import BetsTable from '../../components/BetsTable/BetsTable.jsx';
import Button from '../../components/Button/Button.jsx';
import Spin from '../../components/Spin/Spin.jsx';
import './Room.scss';

const AVAILABLE_BOTS = ['trololo'];

const Room = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func,
        children: React.PropTypes.node,
        room: React.PropTypes.object,
        user: React.PropTypes.object
    },

    getInitialState() {
        return {
            openBotMenu: false,
            botControl: null
        };
    },

    componentDidMount() {
        const {params, dispatch} = this.props;

        dispatch(getRoom(params));
        dispatch(getBetsInRoom(params.roomId));
    },

    componentWillReceiveProps(nextProps) {
        const {room, user} = this.props;

        if (nextProps.room && nextProps.room.users &&
            room && room.users &&
            !nextProps.room.users.find(u => u._id === user.id) &&
            room.users.find(u => u._id === user.id)
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

    addBot(bot) {
        if (this.props.room.rules.charge) {
            this.props.dispatch(insertBot({roomId: this.props.room._id, bot}));
            this.setState({openBotMenu: false});
        }
    },

    render() {
        const {intl, room:
            {_id: roomId, name, owner, code, users, rules={}, chargeUsers=[], changingMe, removingMe},
        user} = this.props;

        const iAmFree = !chargeUsers.some(chargeUser => chargeUser === user.id);

        const iAmOwner = user.id === (!!owner && owner._id);
        const botsInPlay = users
            ? users
                .filter(u => !!u.bot)
                .map(u => u.bot)
            : [];

        const unusedBots = _.difference(AVAILABLE_BOTS, botsInPlay);

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
                    <div className="room__rules">
                        <div>
                            {!rules.free &&
                            <FormattedHTMLMessage id="Room.overallBank" values={{
                                fee: rules.charge && rules.charge.value,
                                currency: rules.charge && rules.charge.currency,
                                value: `${(rules.charge && rules.charge.value || 0) * chargeUsers.length}`
                            }} />}
                        </div>

                        <div className="room__rules-points">
                            <FormattedHTMLMessage id="Room.rules" values={{
                                score: rules.points.score,
                                difference: rules.points.difference,
                                result: rules.points.result,
                                promotion: rules.points.promotion
                                }} />
                        </div>
                    </div>

                    <div className="room__controls">
                        {iAmOwner && unusedBots.length > 0 &&
                            <div>
                                <div
                                    onClick={e => this.setState({openBotMenu: true, botControl: e.currentTarget})}
                                    className="room__add-bot-control" />
                                <Popover
                                    className={b('room', 'add-bot-popup')}
                                open={this.state.openBotMenu}
                                    anchorEl={this.state.botControl}
                                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    onRequestClose={() => this.setState({openBotMenu: false})}>
                                        <Menu>
                                            {unusedBots.map(bot => (
                                                <MenuItem
                                                    key={bot}
                                                    onClick={this.addBot.bind(this, bot)}
                                                    className={b('room', 'add-bot', {bot})}>
                                                        <div className="room__add-bot-title">
                                                            <FormattedMessage id={`Bots.${bot}`} />
                                                        </div>
                                                        <FormattedMessage id={`Bots.${bot}Description`} />
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                </Popover>
                            </div>}
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
                            disabled={removingMe}
                            label={intl.formatMessage({id: 'Room.leaveRoom'}, {removingMe})}
                            onTouchTap={this.removeMe} />
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps({room, user, bets: {data, status}, games}) {
    return {room, user, bets: data, games: games.list};
}

export default connect(mapStateToProps)(injectIntl(Room));
