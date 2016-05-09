import b from 'b_';
import React from 'react';
import Link from '../../Link/Link.jsx';
import BetDialog from '../../BetDialog/BetDialog.jsx';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { getGamePoints } from '../../../points';
import { createBet } from '../../../actions/bets';

import './CellBet.scss';

const BetsTableCellBet = React.createClass({
    propTypes: {
        game: React.PropTypes.object,
        me: React.PropTypes.object
    },

    getInitialState() {
        return {
            avatarElement: null,
            dialogShown: false
        };
    },

    componentWillReceiveProps({betsStatus}) {
        if (betsStatus.created === true && this.props.betsStatus.created === false && this.state.dialogShown) {
            this.setState({dialogShown: false});
        }
    },

    closeDialog() {
        this.setState({dialogShown: false});
    },

    openDialog() {
        this.setState({dialogShown: true});
    },

    save({homeScore, awayScore, homeWins, awayWins}) {
        const {room: {_id: room}, game: {id: gameId}} = this.props;

        this.props.dispatch(createBet({homeScore, awayScore, game: gameId, room, homeWins, awayWins}));
    },

    checkInputValue(value) {
        return value === '' || value.length < 3 && !!value.match(/^\d+$/);
    },

    onHomeChange({target: {value}}) {
        return this.checkInputValue(value) && this.setState({homeScore: value});
    },

    onAwayChange({target: {value}}) {
        return this.checkInputValue(value) && this.setState({awayScore: value});
    },

    render() {
        const {bet: {data: bet, result}, me, game, room} = this.props;
        const {dialogShown} = this.state;
        const showBet = !!bet && typeof bet.homeScore === 'number';
        const iCanDoSmthWithBet = !game.started;
        const fuckedUp = game.started && !bet;
        const iCanCreateFirstBet = !game.started && !bet;
        const className = b('games', 'cell-bet', {
            started: game.started,
            'fucked-up': fuckedUp
        });

        return (
            <div className={`games__cell ${className}`}>
                {!fuckedUp &&
                    <Link disabled={game.started} onClick={this.openDialog} pseudo>
                        {iCanCreateFirstBet
                            ?  <FormattedMessage id="Games.newBet" />
                            : `${bet.homeScore} : ${bet.awayScore}`}
                    </Link>}
                {iCanDoSmthWithBet &&
                    <BetDialog bet={bet} close={this.closeDialog} game={game} save={this.save} shown={dialogShown} />}
            </div>
        );
    }
});

function mapStateToProps({user, room, bets: {status: betsStatus={}}}) {
    return {me: user, room, betsStatus};
}

export default connect(mapStateToProps)(injectIntl(BetsTableCellBet));
