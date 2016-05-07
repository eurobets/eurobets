import b from 'b_';
import React from 'react';

import Button from '../Button/Button.jsx';
import Dialog from '../../../node_modules/material-ui/lib/dialog';
import {FormattedMessage, injectIntl} from 'react-intl';
import { connect } from 'react-redux';

import './BetDialog.scss';
import '../Flag/Flag.scss';

const BetDialog = React.createClass({
    propTypes: {
        close: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
        game: React.PropTypes.object,
        bet: React.PropTypes.object
    },

    getInitialState() {
        const {bet} = this.props;

        return {
            homeScore: bet && bet.homeScore || null,
            awayScore: bet && bet.awayScore || null
        };
    },

    componentWillReceiveProps(nextProps) {
        const nextHomeScore = nextProps.bet && nextProps.bet.homeScore || null;
        const nextAwayScore = nextProps.bet && nextProps.bet.awayScore || null;

        if (this.state.homeScore === null && this.state.awayScore === null) {
            this.setState({homeScore: nextHomeScore, awayScore: nextAwayScore});
        }
    },

    close() {
        this.setState(this.getInitialState(), this.props.close);
    },

    save(e) {
        e.preventDefault();
        const {homeScore, awayScore} = this.state;

        this.props.save({homeScore, awayScore});
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
        const {shown, game, status, intl, message={}} = this.props;
        const creating = status ? status.creating : false;
        const {homeScore, awayScore} = this.state;
        const errorCode =
            message.kind ||
            message.homeScore && message.homeScore.kind ||
            message.awayScore && message.awayScore.kind;
        const readyToSend = !!homeScore && !!awayScore;

        return (
            <Dialog
                autoScrollBodyContent
                open={shown}
                modal={false}
                onRequestClose={this.props.close}
                className="bet-dialog">
                <form onSubmit={this.save}>
                    <div className="bet-dialog__header">
                        {intl.formatMessage({id: 'BetDialog.matchday'}, {matchday: game.matchday})}
                    </div>
                    <div className="bet-dialog__content">
                        <div className={`bet-dialog__flag flag_${game.homeTeamName.replace(/ /g,'')}`} />
                        <div className={b('bet-dialog', 'team-name', {home: true})}>
                            <FormattedMessage id={`Teams.name.${game.homeTeamName}`} />
                        </div>
                        <input
                            onChange={this.onHomeChange}
                            value={homeScore}
                            className={b('bet-dialog', 'input', {home: true})} />
                        {' – '}
                        <input
                            onChange={this.onAwayChange}
                            value={awayScore}
                            className={b('bet-dialog', 'input', {away: true})} />
                        <div className={b('bet-dialog', 'team-name', {away: true})}>
                            <FormattedMessage id={`Teams.name.${game.awayTeamName}`} />
                        </div>
                        <div className={`bet-dialog__flag flag_${game.awayTeamName.replace(/ /g,'')}`} />
                    </div>
                    {errorCode &&
                        <div className="bet-dialog__error-message">
                            <FormattedMessage id={`BetDialog.error.${errorCode}`} />
                        </div>}
                    <div className="bet-dialog__footer">
                        <Button
                            flat
                            label={intl.formatMessage({id: 'BetDialog.cancel'})}
                            secondary
                            onTouchTap={this.close} />
                        <Button
                            type="submit"
                            flat={!readyToSend}
                            disabled={creating}
                            label={intl.formatMessage({id: 'BetDialog.save'}, {creating})}
                            primary={readyToSend}
                            secondary={!readyToSend}
                            keyboardFocused={readyToSend}
                            onTouchTap={this.save} />
                    </div>
                </form>
            </Dialog>
        );
    }
});


function mapStateToProps({bets: {status, message}}) {
    return {status, message};
}

export default connect(mapStateToProps)(injectIntl(BetDialog));
