import b from 'b_';
import React from 'react';
import { connect } from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';

import Spin from '../Spin/Spin.jsx';
import { getGamePoints } from '../../points';
import Link from '../Link/Link.jsx';
import CellBet from '../BetsTable/Cell/CellBet.jsx';
import { getMyBets } from '../../actions/bets';

import './Games.scss';

const MIN_HIDDEN_OLD_GAMES = 2;
const STARTED_GAMES_TO_SHOW = 4;


const TIME_FORMAT = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit'
};

const Games = React.createClass({
    getInitialState() {
        return {
            hideOld: true
        };
    },

    componentDidMount() {
        this.props.dispatch(getMyBets());
    },

    toggleOld() {
        this.setState({hideOld: !this.state.hideOld});
    },

    render() {
        const {games=[], loading, intl, myBets, user, rooms=[], betsStatus, startedGames} = this.props;
        const {hideOld} = this.state;
        const oldGamesNumber = startedGames > STARTED_GAMES_TO_SHOW + MIN_HIDDEN_OLD_GAMES
            ? startedGames - STARTED_GAMES_TO_SHOW
            : 0;

        return !myBets || loading || betsStatus.loading ? <Spin center /> : (
            <div className="games">
                <div className="games__head">
                    <div className="games__cell games__cell-time">
                        {oldGamesNumber > 0 &&
                            <Link mix="games__toggle-old-games" onClick={this.toggleOld} pseudo>
                                <FormattedMessage id="Games.toggleOld" values={{hideOld}} />
                            </Link>}
                    </div>
                    <div className="games__cell games__cell-teams">
                        &nbsp;
                    </div>
                    <div className="games__cell games__cell-score">
                        &nbsp;
                    </div>
                    {rooms.map(({name}, index) => (
                        <div key={index} className="games__cell games__cell-bet"><div>{name}</div></div>
                    ))}
                </div>
                {games.map((game, index) => {
                    const homeClassName = b('games', 'team', { winner: game.homeWins, loser: game.awayWins});
                    const awayClassName = b('games', 'team', { winner: game.awayWins, loser: game.homeWins});
                    const hidden = hideOld && index < oldGamesNumber;
                    return (
                        <div className={b('games', 'row', {hidden})} key={game.id}>
                            <div className="games__cell games__cell-time">
                                {intl.formatTime(game.date, TIME_FORMAT)}
                            </div>
                            <div className="games__cell games__cell-teams">
                                <span className={homeClassName}>
                                    <FormattedMessage
                                        defaultMessage={game.homeTeamName}
                                        id={`Teams.name.${game.homeTeamName}`}/>
                                </span>
                                &nbsp;–&nbsp;
                                <span className={awayClassName}>
                                    <FormattedMessage
                                        defaultMessage={game.awayTeamName}
                                        id={`Teams.name.${game.awayTeamName}`}/>
                                </span>
                            </div>
                            <div className="games__cell games__cell-score">
                                <strong>
                                    {typeof game.result.goalsHomeTeam === 'number' ? game.result.goalsHomeTeam : '-'}
                                    {' : '}
                                    {typeof game.result.goalsAwayTeam === 'number' ? game.result.goalsAwayTeam : '-'}
                                </strong>
                            </div>
                            {rooms && rooms.map((room, index) => {
                                const myRoomBets = myBets.find(bet => bet[room._id]);
                                const bet = myRoomBets &&
                                    myRoomBets[room._id] &&
                                    myRoomBets[room._id][user.id] &&
                                    myRoomBets[room._id][user.id].games[game.id] || {};

                                return (
                                    <CellBet
                                        mode="myBets"
                                        bet={myRoomBets &&
                                            myRoomBets[room._id] &&
                                            myRoomBets[room._id][user.id] &&
                                            myRoomBets[room._id][user.id].games[game.id] || {}}
                                        betsStatus={betsStatus}
                                        key={room._id}
                                        mix="games__cell-bet"
                                        userId={user.id}
                                        points={bet.result && getGamePoints(bet.result, room.rules.points, game.matchday)}
                                        room={room}
                                        game={game} />
                                )
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
});

function mapStateToProps({games, games: {list, message}, bets: {data, my, status}, user, room: {rooms}}) {
    const startedGames = list ? list.filter(game => game.started).length : 0;
    return {
        games: list,
        startedGames,
        loading: games.loading,
        message,
        myBets: my,
        user,
        rooms,
        betsStatus: status
    };
}

export default connect(mapStateToProps)(injectIntl(Games));
