import React from 'react';
import { connect } from 'react-redux';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from 'react-intl';

import Link from '../Link/Link.jsx';
import { getGames } from '../../actions/games';

import './Games.scss';

const TIME_FORMAT = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit'
};

const Games = React.createClass({
    propTypes: {
        games: React.PropTypes.array,
        intl: React.PropTypes.object.isRequired
    },

    componentDidMount() {
        this.props.dispatch(getGames());
    },

    render() {
        const {games=[], loading, intl} = this.props;

        return (
            <table className="games">
                <tbody>
                    {games.map(({date, homeTeamName: home, awayTeamName: away, matchday, result}) => (
                        <tr className="games__item" key={`${matchday}_${home}_${away}`}>
                            <td className="games__item-teams">
                                <FormattedMessage id={`Teams.name.${home}`} />
                                {' – '}
                                <FormattedMessage id={`Teams.name.${away}`} />
                            </td>
                            <td>
                                <strong> {result.goalsHomeTeam || '-'}:{result.goalsAwayTeam || '-'} </strong>
                            </td>
                            <td className="games__item-time">
                                {intl.formatTime(date, TIME_FORMAT)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
});

function mapStateToProps({games: {list, loading, message}}) {
    return {games: list, loading, message};
}

export default connect(mapStateToProps)(injectIntl(Games));
