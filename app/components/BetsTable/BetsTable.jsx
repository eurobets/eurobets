import _ from 'lodash';
import b from 'b_';
import React from 'react';
import { connect } from 'react-redux';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';

import Spin from '../Spin/Spin.jsx';
import CellBet from '../BetsTable/Cell/CellBet.jsx';
import CellHeader from './Cell/CellHeader.jsx';

import { removeUser } from '../../actions/rooms';
import { getTrololoPoints, getGamePoints } from '../../points';

import './BetsTable.scss';
import '../Flag/Flag.scss';

const BetsTable = React.createClass({
    propTypes: {
        teams: React.PropTypes.array,
        games: React.PropTypes.array,
        room: React.PropTypes.object,
        intl: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            hoveredRow: null
        };
    },

    componentDidMount() {
        if (this.props.games && this.props.games.some(game => game.actual)) {
            $('.bets-table__main-table-wrapper').scrollTo('.bets-table__cell_actual', 500);
        }
    },

    componentDidUpdate(prevProps) {
        const {games} = this.props;
        if (!prevProps.games.some(game => game.actual) && games.some(game => game.actual)) {
            $('.bets-table__main-table-wrapper').scrollTo('.bets-table__cell_actual', 500);
        }
    },

    removeUser(userId) {
        this.props.dispatch(removeUser({roomId: this.props.room._id, userId}));
    },

    onRowEnter(rowId) {
        this.setState({hoveredRow: rowId});
    },

    onRowLeave() {
        this.setState({hoveredRow: null});
    },

    render() {
        const {
            points,
            games=[],
            loading,
            user,
            room,
            room: {users=[], rules={}, owner},
            bets={},
            betsStatus} = this.props;
        const {hoveredRow} = this.state;

        const iAmOwner = user.id === (!!owner && owner._id);

        return (
            <div className="bets-table">
                {loading && <Spin center />}
                <div className="bets-table__header-table-wrapper">
                    <div className="bets-table__header-table">
                        <div className="bets-table__row">
                            <div className={b('bets-table', 'cell', {header: true, first: true})} />
                        </div>
                        {users.map(user => (
                            <div
                                className={b('bets-table', 'row', {
                                    hovered: hoveredRow === user._id,
                                    charge: user.charge,
                                    bot: user.bot
                                })}
                                key={user._id}
                                onMouseEnter={this.onRowEnter.bind(this, user._id)}
                                onMouseLeave={this.onRowLeave}>
                                <div className="bets-table__cell">
                                    <div className="bets-table__username">
                                        {user.profile.name} {user.profile.lastName}
                                    </div>
                                    {!!user.bot &&
                                        <div className="bets-table__bot-description-control">
                                            <div className="bets-table__bot-description-popup">
                                                <FormattedMessage id={`Bots.${user.bot}Description`} />
                                            </div>
                                        </div>}
                                    {!!user.bot && iAmOwner &&
                                        <div
                                            onClick={this.removeUser.bind(this, user._id)}
                                            className="bets-table__remove-control" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bets-table__main-table-wrapper">
                    <div className="bets-table__main-table">
                        <div className="bets-table__row">
                            {games.map(game => (
                                <CellHeader
                                    key={`${game.matchday}_${game.homeTeamName}_${game.awayTeamName}`}
                                    game={game} />
                            ))}
                        </div>
                        {users.map(user => (
                            <div
                                className={b('bets-table', 'row', {hovered: hoveredRow === user._id})}
                                key={user._id}
                                onMouseEnter={this.onRowEnter.bind(this, user._id)}
                                onMouseLeave={this.onRowLeave}>
                                    {games.map((game, index) => (
                                        <CellBet
                                            bet={bets[user._id] && bets[user._id].games[game.id] || {}}
                                            points={points[user._id] && points[user._id][game.id]}
                                            betsStatus={betsStatus}
                                            key={game.id}
                                            userId={user._id}
                                            room={room}
                                            game={game} />
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bets-table__overall-table-wrapper">
                    <div className="bets-table__overall-table">
                        <div className="bets-table__row">
                            <div className={b('bets-table', 'cell', {header: true})}>
                                <FormattedMessage id="BetsTable.points" />
                            </div>
                        </div>
                        {users.map(user => (
                            <div className={b('bets-table', 'row', {hovered: hoveredRow === user._id})} key={user._id}>
                                <div className="bets-table__cell">
                                    {_.sum(_.values( points[user._id])) || 0}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps({room, games, games: {list=[], message}, bets, bets: {data, status: betsStatus}, user}) {
    const lastStartedGame = _.findLast(list, game => game.started === true);
    const lastStartedDate = lastStartedGame
        ? new Date(lastStartedGame.date).setHours(0, 0, 0, 0)
        : 0;

    // актуальные игры - игры, сыгранные за последние два дня
    const actualGames = list.filter(game =>
        lastStartedDate - new Date(game.date).setHours(0, 0, 0, 0) < 1000 * 48 * 60 * 60).map(game => game.id);

    list = list.map(game => {
        game.actual = actualGames.indexOf(game.id) > -1;
        return game;
    });

    room.users = room.users.map(user => {
        user.charge = room.chargeUsers && room.chargeUsers.includes(user._id);
        return user;
    });

    room.users = room.users
        .sort(({profile: a}, {profile: b}) => { // сортируем всех по алфавиту
            const nameA = `${a.name.toLowerCase()} ${a.lastName.toLowerCase()}`;
            const nameB = `${b.name.toLowerCase()} ${b.lastName.toLowerCase()}`;

            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });

    // ботов в самый низ
    room.users =
        room.users
            .filter(u => !u.bot)
            .concat(room.users.filter(u => !!u.bot));

    // себя - наверх
    room.users = room.users
        .filter(u => u._id === user.id)
        .concat(room.users.filter(u => u._id !== user.id));

    // на деньги - наверх
    room.users =
        room.users
            .filter(u => u.charge)
            .concat(room.users.filter(u => !u.charge));

    let points = {};
    const gamesMaxPoints = {};

    if (data && room.users) {
        room.users
            .forEach(u => {
                const userPoints = data[u._id] && data[u._id].games;

                points[u._id] = userPoints
                    ? _.mapValues(userPoints, ((g, gameId) => {
                        const gamePoint = g && g.result
                            ? getGamePoints(g.result, room.rules.points)
                            : null;
                        if (u.charge && (!gamesMaxPoints[gameId] || gamesMaxPoints[gameId] < gamePoint)) {
                            gamesMaxPoints[gameId] = gamePoint;
                        }

                        return gamePoint;
                    }))
                    : {};
            });

        const trololo = room.users.find(u => u.bot === 'trololo');

        if (trololo) {
            points = getTrololoPoints(trololo, points, gamesMaxPoints, room.rules, games.list);
        }
    }

    return {
        points,
        user,
        games: list,
        message,
        bets: data,
        loading: betsStatus.loading || room.loading || games.loading,
        room,
        betsStatus
    };
}

export default connect(mapStateToProps)(injectIntl(BetsTable));
