import _ from 'lodash';
import b from 'b_';
import React from 'react';
import Link from '../../Link/Link.jsx';
import BetDialog from '../../BetDialog/BetDialog.jsx';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { createBet } from '../../../actions/bets';

import '../BetsTable.scss';
import './CellBet.scss';
import '../../Flag/Flag.scss';

const BetsTableCellBet = React.createClass({
    propTypes: {
        game: React.PropTypes.object,
        userId: React.PropTypes.string,
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
        const {room: {_id: room}, game: {id: gameId}, mode} = this.props;

        this.props.dispatch(createBet({homeScore, awayScore, game: gameId, room, homeWins, awayWins, mode}));
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
        const {points, bet: {data: bet}, me, userId, game, mix=''} = this.props;
        const {dialogShown} = this.state;
        const showBet = !!bet && typeof bet.homeScore === 'number';
        const showResult = points !== null && game.result.goalsHomeTeam !== null;
        const iCanDoSmthWithBet = me.id === userId && !game.started;
        const iCanCreateFirstBet = iCanDoSmthWithBet && !bet;
        let toPromote;

        if (showBet && bet.homeScore === bet.awayScore) {
            if (bet.homeWins) {
                toPromote = 'home';
            }
            if (bet.awayWins) {
                toPromote = 'away';
            }
        }

        const className = b('bets-table', 'cell', {
            status: points > 0 ? 'success' : 'fail',
            actual: game.actual,
            bet: true,
            started: game.started,
            'to-promote': toPromote,
            'fucked-up': game.started && (points === null || points === undefined),
            'hidden-bet': !!bet && typeof bet.homeScore !== 'number'
        });

        return (
            <div className={`${className} ${mix}`}>
                <div className="bets-table__cell-content">
                    {(showBet || iCanCreateFirstBet || iCanDoSmthWithBet) &&
                        <div className="bets-table__cell-content-bet">
                            {showBet &&
                                <Link
                                    disabled={game.started || game.result.goalsHomeTeam !== null}
                                    onClick={this.openDialog} pseudo>{bet.homeScore} : {bet.awayScore}</Link>}
                            {iCanCreateFirstBet &&
                                <svg
                                    onClick={this.openDialog}
                                    className="bets-table__cell-add-icon"
                                    viewBox="0 0 24 24">
                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                        <path d="M0 0h24v24H0z" fill="none" />
                                </svg>}
                            {iCanDoSmthWithBet &&
                                <BetDialog
                                    bet={bet}
                                    close={this.closeDialog}
                                    game={game}
                                    save={this.save}
                                    shown={dialogShown} />}
                        </div>}
                    {showResult &&
                        <div className="bets-table__cell-content-result">
                            {points}
                        </div>}
                </div>
            </div>
        );
    }
});

function mapStateToProps({user}) {
    return {me: user};
}

export default connect(mapStateToProps)(injectIntl(BetsTableCellBet));
