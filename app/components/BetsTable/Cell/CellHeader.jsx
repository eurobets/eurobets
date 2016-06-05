import b from 'b_';
import React from 'react';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';

import '../BetsTable.scss';
import './CellHeader.scss';
import '../../Flag/Flag.scss';

const BetsTableCellHeader = React.createClass({
    propTypes: {
        teams: React.PropTypes.array,
        games: React.PropTypes.array,
        room: React.PropTypes.object,
        intl: React.PropTypes.object.isRequired
    },

    render() {
        const {game, game: {actual, homeTeamName: home, awayTeamName: away, result}} = this.props;
        const homeClassName = b('bets-table', 'flag', {
            loser: game.awayWins
        });
        const awayClassName = b('bets-table', 'flag', {
            loser: game.homeWins
        });
        return (
            <div className={b('bets-table', 'cell', {header: true, actual})}>
                <div className="bets-table__cell-header-teams">
                    <div
                        className={`${homeClassName} flag_${home.replace(/ /g,'')}`} />
                    <div className="bets-table__cell-header-vs">
                        {result.goalsHomeTeam !== null ? result.goalsHomeTeam : '-'}
                        {' : '}
                        {result.goalsAwayTeam !== null ? result.goalsAwayTeam : '-'}
                    </div>
                    <div className={`${awayClassName} flag_${away.replace(/ /g,'')}`} />
                </div>
            </div>
        );
    }
});


export default injectIntl(BetsTableCellHeader);
