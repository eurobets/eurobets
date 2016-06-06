import _ from 'lodash';
import b from 'b_';
import React from 'react';
import { connect } from 'react-redux';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';

import CellBet from '../BetsTable/Cell/CellBet.jsx';
import CellHeader from './Cell/CellHeader.jsx';
import { getGames } from '../../actions/games';
import { getBetsInRoom } from '../../actions/bets';
import { getOverallPoints } from '../../points';

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

    onRowEnter(rowId) {
        this.setState({hoveredRow: rowId});
    },

    onRowLeave() {
        this.setState({hoveredRow: null});
    },

    render() {
        const {games=[], room, room: {users=[], rules={}}, bets={}, betsStatus} = this.props;
        const {hoveredRow} = this.state;

        return (
            <div className="bets-table">
                <div className="bets-table__header-table-wrapper">
                    <div className="bets-table__header-table">
                        <div className="bets-table__row">
                            <div className={b('bets-table', 'cell', {header: true, first: true})} />
                        </div>
                        {users.map(user => (
                            <div
                                className={b('bets-table', 'row', {
                                    hovered: hoveredRow === user._id,
                                    charge: user.charge
                                })}
                                key={user._id}
                                onMouseEnter={this.onRowEnter.bind(this, user._id)}
                                onMouseLeave={this.onRowLeave}>
                                <div className="bets-table__cell">
                                    <div className="bets-table__username">
                                        {user.profile.name} {user.profile.lastName}
                                    </div>
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
                                    {bets[user._id]
                                        ? getOverallPoints(bets[user._id].overall, rules.points)
                                        : 0}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps({room, games: {list=[], loading, message}, bets: {data, status: betsStatus}, user}) {
    const lastStartedGame = _.findLast(list, game => game.started === true);
    const lastStartedDate = lastStartedGame
        ? new Date(lastStartedGame.date).setHours(0, 0, 0, 0)
        : 0;

    // актуальные игры - последние начавшиеся. Берётся последний день
    const actualGames = list.filter(game =>
        new Date(game.date).setHours(0, 0, 0, 0) === lastStartedDate).map(game => game.id);

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
        })
        .sort((a, b) => { // затем поднимаем себя наверх
            if (a._id === user.id && b._id !== user.id) {
                return -1;
            }
            if (a._id !== user.id && b._id === user.id) {
                return 1;
            }
            return 0;
        })
        .sort((a, b) => a.charge < b.charge); // делим на группы платные/бесплатные

    return {games: list, loading, message, bets: data, room, betsStatus};
}

export default connect(mapStateToProps)(injectIntl(BetsTable));
