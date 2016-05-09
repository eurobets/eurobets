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
        const {game: {homeTeamName: home, awayTeamName: away, result}} = this.props;

        return (
            <div className={b('bets-table', 'cell', {header: true})}>
                <div className="bets-table__cell-header-teams">
                    <div className={`bets-table__flag flag_${home.replace(/ /g,'')}`} />
                    <div className="bets-table__cell-header-vs">
                        {result.goalsHomeTeam !== null ? result.goalsHomeTeam : '-'}
                        {' : '}
                        {result.goalsAwayTeam !== null ? result.goalsAwayTeam : '-'}
                    </div>
                    <div className={`bets-table__flag flag_${away.replace(/ /g,'')}`} />
                </div>
            </div>
        );
    }
});


export default injectIntl(BetsTableCellHeader);
