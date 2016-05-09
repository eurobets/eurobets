import b from 'b_';
import React from 'react';
import { connect } from 'react-redux';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';

import CellBet from './Cell/CellBet.jsx'
import CellHeader from './Cell/CellHeader.jsx'
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
        const {dispatch, room} = this.props;
    },

    onRowEnter(rowId) {
        this.setState({hoveredRow: rowId});
    },

    onRowLeave() {
        this.setState({hoveredRow: null});
    },

    render() {
        const {games=[], loading, intl, room: {users=[], rules={}}, bets={}} = this.props;
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
                                className={b('bets-table', 'row', {hovered: hoveredRow === user._id})}
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
                                            key={game.id}
                                            userId={user._id}
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

function mapStateToProps({games: {list, loading, message}, bets: {data}}) {
    return {games: list, loading, message, bets: data};
}

export default connect(mapStateToProps)(injectIntl(BetsTable));
