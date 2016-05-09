import React from 'react';
import { connect } from 'react-redux';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';

import { getGamePoints } from '../../points';
import Link from '../Link/Link.jsx';
import CellBet from './CellBet/CellBet.jsx';
import { getGames } from '../../actions/games';
import { getBetsInRoom } from '../../actions/bets';

import './Games.scss';

const TIME_FORMAT = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit'
};

const Games = React.createClass({
    render() {
        const {games=[], loading, intl, bets={}, user, room} = this.props;
        const myBets = bets[user.id];
        console.log(myBets);

        return (
            <div className="games">
                <div className="games__head">
                    <div className="games__cell games__cell-teams">
                        &nbsp;
                    </div>
                    <div className="games__cell games__cell-score">
                        <FormattedMessage id="Games.score" />
                    </div>
                    <div className="games__cell games__cell-bet">
                        <FormattedMessage id="Games.bet" />
                    </div>
                    <div className="games__cell games__cell-points">
                        <FormattedMessage id="Games.points" />
                    </div>
                    <div className="games__cell games__cell-time">
                        &nbsp;
                    </div>
                </div>
                {games.map(game => (
                    <div className="games__row" key={game.id}>
                        <div className="games__cell games__cell-teams">
                            <FormattedMessage id={`Teams.name.${game.homeTeamName}`} />
                            {' – '}
                            <FormattedMessage id={`Teams.name.${game.awayTeamName}`} />
                        </div>
                        <div className="games__cell games__cell-score">
                            <strong>
                                {game.result.goalsHomeTeam !== null ? game.result.goalsHomeTeam : '-'}
                                {' : '}
                                {game.result.goalsAwayTeam !== null ? game.result.goalsAwayTeam : '-'}
                            </strong>
                        </div>
                        <CellBet
                            bet={myBets && myBets.games[game.id] || {}}
                            userId={user.id}
                            game={game} />
                        <div className="games__cell games__cell-points">
                            {game.started
                                ? myBets && myBets.games[game.id] && myBets.games[game.id].result &&
                                    getGamePoints(myBets.games[game.id].result, room.rules.points) || 0
                                : '–'}
                        </div>
                        <div className="games__cell games__cell-time">
                            {intl.formatTime(game.date, TIME_FORMAT)}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
});

function mapStateToProps({games: {list, loading, message}, bets: {data}, user, room}) {
    return {games: list, loading, message, bets: data, user, room};
}

export default connect(mapStateToProps)(injectIntl(Games));
