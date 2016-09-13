import b from 'b_';
import React from 'react';

import Button from '../Button/Button.jsx';
import Dialog from '../../../node_modules/material-ui/lib/dialog';
import RadioButtonGroup from '../../../node_modules/material-ui/lib/radio-button-group';
import RadioButton from '../../../node_modules/material-ui/lib/radio-button';
import { GROUP_GAMES } from '../../points';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import './BetDialog.scss';
import '../Flag/Flag.scss';

const TIME_FORMAT = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit'
};

const BetDialog = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    propTypes: {
        close: React.PropTypes.func.isRequired,
        save: React.PropTypes.func.isRequired,
        game: React.PropTypes.object,
        bet: React.PropTypes.object
    },

    getInitialState() {
        const {bet} = this.props;

        return {
            promotionTeam: this.getPromotionTeam(bet),
            homeScore: bet ? bet.homeScore : null,
            awayScore: bet ? bet.awayScore : null
        };
    },

    componentWillReceiveProps(nextProps) {
        const nextHomeScore = nextProps.bet ? nextProps.bet.homeScore : null;
        const nextAwayScore = nextProps.bet ? nextProps.bet.awayScore : null;

        if (!nextProps.status.creating && !this.props.status.creating) {
            this.setState({
                homeScore: nextHomeScore,
                awayScore: nextAwayScore,
                promotionTeam: this.getPromotionTeam(nextProps.bet)
            });
        }
    },

    getPromotionTeam(bet) {
        if (!bet) {
            return 'home';
        }

        if (bet.homeWins) {
            return 'home';
        }
        if (bet.awayWins) {
            return 'away';
        }

        return 'home';
    },

    close() {
        this.props.close();
    },

    save(e) {
        e.preventDefault();
        const {homeScore, awayScore, promotionTeam} = this.state;
        const {game} = this.props;
        let homeWins;
        let awayWins;

        if (game.matchday > GROUP_GAMES) {
            if (this.isDraw()) {
                if (promotionTeam === 'home') {
                    homeWins = true;
                    awayWins = false;
                }

                if (promotionTeam === 'away') {
                    homeWins = false;
                    awayWins = true;
                }
            } else {
                if (homeScore > awayScore) {
                    homeWins = true;
                    awayWins = false;
                }
                if (homeScore < awayScore) {
                    homeWins = false;
                    awayWins = true;
                }
            }
        }

        this.props.save({homeScore, awayScore, homeWins, awayWins});
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

    onPromotionChange({target: {value: promotionTeam}}) {
        this.setState({promotionTeam});
    },

    isDraw() {
        return this.state.homeScore !== null &&
            this.state.homeScore !== undefined &&
            Number(this.state.homeScore) === Number(this.state.awayScore);
    },

    render() {
        const {shown, game, status, intl, message={}} = this.props;
        const creating = status ? status.creating : false;
        const {homeScore, awayScore, promotionTeam} = this.state;
        const errorCode =
            message.kind ||
            message.homeScore && message.homeScore.kind ||
            message.awayScore && message.awayScore.kind;
        const readyToSend = !!homeScore && !!awayScore;

        return (
            <Dialog
                autoDetectWindowHeight={false}
                actionsContainerClassName="bet-dialog__actions"
                bodyClassName="bet-dialog__body"
                open={shown}
                modal={false}
                onRequestClose={this.props.close}
                className="bet-dialog">
                <form onSubmit={this.save}>
                    <div className="bet-dialog__header">
                        <div className="bet-dialog__header-stage">
                            {intl.formatMessage({id: 'BetDialog.matchday'}, {matchday: game.matchday})}
                        </div>
                        <div className="bet-dialog__header-date">
                            {intl.formatTime(game.date, TIME_FORMAT)}
                        </div>
                    </div>
                    <div className="bet-dialog__content">
                        <div className={`bet-dialog__flag flag_${game.homeTeamName.replace(/( |\.)/g,'')}`} />
                        <div className={b('bet-dialog', 'team-name', {home: true})}>
                            <FormattedMessage
                                defaultMessage={game.homeTeamName}
                                id={`Teams.name.${game.homeTeamName}`} />
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
                            <FormattedMessage
                                defaultMessage={game.awayTeamName}
                                id={`Teams.name.${game.awayTeamName}`} />
                        </div>
                        <div className={`bet-dialog__flag flag_${game.awayTeamName.replace(/( |\.)/g,'')}`} />
                    </div>
                    {game.matchday > GROUP_GAMES &&
                        <div className={b('bet-dialog', 'promotion', {shown: this.isDraw()})}>
                            <h3><FormattedMessage id="BetDialog.teamToPromote" /></h3>
                            <RadioButtonGroup
                                name="promote"
                                onChange={this.onPromotionChange}
                                valueSelected={promotionTeam}>
                                    <RadioButton
                                        value="home"
                                        label={intl.formatMessage({
                                            defaultMessage: game.homeTeamName,
                                            id: `Teams.name.${game.homeTeamName}`})
                                        } />
                                    <RadioButton
                                        value="away"
                                        label={intl.formatMessage({
                                            defaultMessage: game.awayTeamName,
                                            id: `Teams.name.${game.awayTeamName}`})
                                        } />
                            </RadioButtonGroup>
                        </div>}
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
